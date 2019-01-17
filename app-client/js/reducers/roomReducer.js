import {
  CREATE_ROOM_BEGIN,
  CREATE_ROOM_FAILURE,
  CREATE_ROOM_SUCCESS,
  GET_ROOMS_BEGIN,
  GET_ROOMS_FAILURE,
  GET_ROOMS_SUCCESS
} from 'actions/roomActions';

const initialState = {
  creatingRoom: false,
  createdRoom: null,
  error: null,
  fetchingRooms: false,
  rooms: null
};

export default function roomReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_ROOM_BEGIN:
      return {
        ...state,
        creatingRoom: true
      };

    case CREATE_ROOM_FAILURE:
      return {
        ...state,
        creatingRoom: false,
        error: action.payload.error
      }

    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        creatingRoom: false,
        createdRoom: action.payload.room
      }

      case GET_ROOMS_BEGIN:
        return {
          ...state,
          fetchingRooms: true
        };

      case GET_ROOMS_FAILURE:
        return {
          ...state,
          fetchingRooms: false,
          error: action.payload.error
        }

      case GET_ROOMS_SUCCESS:
        return {
          ...state,
          fetchingRooms: false,
          rooms: action.payload.rooms
        }


    default:
      return state;
  }
}
