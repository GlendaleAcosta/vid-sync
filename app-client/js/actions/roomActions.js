import handleFetchErrors from 'util/handleFetchErrors';

export const CREATE_ROOM_BEGIN   = 'CREATE_ROOM_BEGIN';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILURE = 'CREATE_ROOM_FAILURE';
export const GET_ROOMS_BEGIN = 'GET_ROOMS_BEGIN';
export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const GET_ROOMS_FAILURE = 'GET_ROOMS_FAILURE';


export const createRoomBegin = () => ({
  type: CREATE_ROOM_BEGIN
});

export const createRoomSuccess = room => ({
  type: CREATE_ROOM_SUCCESS,
  payload: { room }
});

export const createRoomFailure = error => ({
  type: CREATE_ROOM_FAILURE,
  payload: { error }
});

export const getRoomsBegin = () => ({
  type: GET_ROOMS_BEGIN
});

export const getRoomsSuccess = rooms => ({
  type: GET_ROOMS_SUCCESS,
  payload: { rooms }
});

export const getRoomsFailure = error => ({
  type: GET_ROOMS_FAILURE,
  payload: { error }
});

export function createRoom(username) {
  return dispatch => {
    dispatch(createRoomBegin());
    return fetch("/api/create-room", {
      method: 'post',
      body: JSON.stringify({username: username}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(handleFetchErrors)
      .then(res => res.json())
      .then(roomJSON => {
        dispatch(createRoomSuccess())
        return roomJSON;
      })
      .catch(error => dispatch(createRoomFailure(error)));
  };
}

export function getOpenRooms() {
  return dispatch => {
    dispatch(getRoomsBegin());
    return fetch("/api/rooms")
      .then(handleFetchErrors)
      .then(res => res.json())
      .then(rooms => {
        dispatch(getRoomsSuccess(rooms))
        return rooms;
      })
      .catch(error => dispatch(getRoomsFailure(error)));
  };
}
