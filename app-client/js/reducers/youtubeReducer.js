import {
  FETCH_VIDEOS_BEGIN,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  SET_CURR_VIDEO,
  SET_CURR_VIDEO_SUCCESS,
  SET_CURR_VIDEO_BEGIN,
  SET_CURR_VIDEO_FAILURE,
  INIT_ROOM
} from 'actions/youtubeActions';

const initialState = {
  fetchingVideos: false,
  error: null,
  videos: null,
  nextPageToken: null,
  pageInfo: null,
  currVideo: null,
  initData: null,
  settingVideo: false
};

export default function youtubeReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_VIDEOS_BEGIN:
      return {
        ...state,
        fetchingVideos: true
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        fetchingVideos: false,
        videos: action.payload.items,
        nextPageToken: action.payload.nextPageToken,
        pageInfo: action.payload.pageInfo
      };
    case FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };

    case SET_CURR_VIDEO: {
      return {
        ...state,
        currVideo: action.payload,
      }
    }
    case SET_CURR_VIDEO_SUCCESS: {
      return {
        ...state,
        settingVideo: false,
        currVideo: action.payload
      };
    }
    case SET_CURR_VIDEO_BEGIN:
      return {
        ...state,
        settingVideo: true
      };
    case SET_CURR_VIDEO_FAILURE:
      return {
        ...state,
        settingVideo: false,
        error: action.payload.error
      };

    case INIT_ROOM: {
      return {
        ...state,
        currVideo: action.payload.currVideo,
        initData: action.payload
      }
    }
    default:
      return state;
  }
}
