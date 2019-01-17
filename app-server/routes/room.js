const {
  createRoom,
  getRooms,
  selectVideo,
  getVideoData
} = require('../actions/roomActions');

const app = module.exports = require('express')();

app.post('/api/create-room', async (req, res) => {
  try {
    const {username} = req.body;
    let room = await createRoom(username);
    room = room.toJSON();
    return res.json(room);
  } catch(err) {

  }
})

app.post('/api/select-video', async (req, res) => {
  try {
    const {video, roomId} = req.body;
    const room = await selectVideo(video, roomId);
    const roomJSON = room.toJSON();
    return res.json(roomJSON);
  } catch (err) {

  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    let rooms = await getRooms();

    const modifiedRooms = await Promise.all(rooms.map(async (room) => {
      let roomJSON = room.toJSON();
      const videoData = await getVideoData(roomJSON);
      roomJSON = {
        ...roomJSON,
        thumbnail: videoData.thumbnail,
        title: videoData.title
      }
      return roomJSON;
    }));
    return res.json(modifiedRooms);
  } catch(err) {

  }
})
