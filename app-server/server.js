const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
var redis   = require("redis");
var client = redis.createClient(process.env.REDIS_URL);
const uuidv4 = require('uuid/v4');
const { deleteRoom } = require('./actions/roomActions');

dotenv.load({ path: '.env' });

const PORT = process.env.PORT || 3001;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(routes);

io.on('connection', function(socket){
  const roomId = socket.handshake.query.roomId;

  socket.join(roomId, () => {
    client.get(roomId, (err, data) => {

      const initData = JSON.parse(data);
      socket.emit('init', initData);
    });
  });

  socket.on('client-chat', function(chatLine){
    chatLine = {
      ...chatLine,
      id: uuidv4(),
    }
    io.to(roomId).emit('server-chat', chatLine);
  });

  socket.on('client-play', function(time){

    client.get(roomId, (err, res) => {
      let result = JSON.parse(res);
      const data = {
        ...result,
        isPlaying: true,
        time: time,
        timestamp: Date.now(),
      }
      client.set(roomId, JSON.stringify(data));
      socket.to(roomId).emit('server-play', time);
    })
  });

  socket.on('client-pause', function(time){

    client.get(roomId, (err, res) => {
      let result = JSON.parse(res);
      const data = {
        ...result,
        isPlaying: false,
        time: time,
        timestamp: Date.now(),
      }
      client.set(roomId, JSON.stringify(data));
      socket.to(roomId).emit('server-pause', time);
    })
  });

  socket.on('client-seekTo', function(time){
    client.get(roomId, (err, res) => {
      let result = JSON.parse(res);
      const data = {
        ...result,
        time: time,
        timestamp: Date.now(),
      }
      client.set(roomId, JSON.stringify(data));
      socket.to(roomId).emit('server-seekTo', time);
    })
  });

  socket.on('client-change-video', function(video) {
    client.get(roomId, (err, res) => {
      let result = JSON.parse(res);
      const data = {
        ...result,
        currVideo: video,
        time: 0,
        timestamp: Date.now(),
      };
      client.set(roomId, JSON.stringify(data));
      socket.to(roomId).emit('server-change-video', video);
    })
  })

  socket.on('disconnect', function(){
    io.in(roomId).clients(async (err, clients) => {
      if (clients.length === 0) {
        await deleteRoom(roomId);
      }
    });
    socket.leave(roomId);
  });
});

// Server
http.listen(PORT, function(){
  console.log(`App is up on port ${PORT}`);
});
