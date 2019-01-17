var models = require('../models');
var link = "https://www.youtube.com/watch?v=aMUvOC1VEHw";
var redis   = require("redis");
var client = redis.createClient(process.env.REDIS_URL);
const uuidv4 = require('uuid/v4');

async function createRoom(username) {
  return new Promise(resolve => {
    const defaultData = {
      currVideo: {
        id: {
          videoId: "aMUvOC1VEHw"
        },
        snippet: {
          channelId: "UCd_aLkLVCI646Ij-tcR1n3g",
          channelTitle: "JazMaybe",
          description: "Stay Alive -JazzzzMaybe Remix- Re:Life in a different world from zero Re:ゼロから始める異世界生活 Re:从零开始的异世界生活ED2 Heart's Cry エミリア(CV:高橋李 ...",
          liveBroadcastContent: "none",
          publishedAt: "2016-09-13T05:37:47.000Z",
          thumbnails: {
            medium: {
              url: "https://i.ytimg.com/vi/aMUvOC1VEHw/mqdefault.jpg"
            }
          },
          title: `[JazzzzMaybe]Re:0 ED2 "Stay Alive" -Remix-`
        },
      },
      isPlaying: true,
      time: 0,
      timestamp: Date.now()
    }
    const uuid = uuidv4();
    const id = uuidv4();
    const data = {
      id: id,
      host: username,
      title: defaultData.currVideo.snippet.title,
      thumbnail: defaultData.currVideo.snippet.thumbnails.medium.url,
      uuid: uuid
    };
    models.Room.create(data)
    .then(res => {
      client.set(res.get('id'), JSON.stringify(defaultData));
      resolve(res)
    });
  });
}

async function getRooms() {
  return new Promise(resolve => {
    models.Room.findAll({limit: 10})
      .then(res => resolve(res));
  });
}

async function selectVideo(video, roomId) {
  return new Promise(resolve => {
    const updateValues = {thumbnail: video.snippet.thumbnails.medium.url, title: video.snippet.title }
    models.Room.update(updateValues, {where: {id: roomId}}).then((res) => {
      resolve(video);
    })
  });
}

async function getVideoData(room) {
  return new Promise(resolve => {
    client.get(room.id, (err, res) => {
      const videoJSON = JSON.parse(res);
      const thumbnail = videoJSON.currVideo.snippet.thumbnails.medium.url
      const title = videoJSON.currVideo.snippet.title;
      const videoData = {thumbnail, title};
      resolve(videoData);
    });
  })
}

async function deleteRoom(roomId) {
  return new Promise(resolve => {
    models.Room.destroy({
      where: {id : roomId}
    })
      .then(res => resolve(res));
  });
}

module.exports = {
  createRoom,
  getRooms,
  selectVideo,
  getVideoData,
  deleteRoom
}
