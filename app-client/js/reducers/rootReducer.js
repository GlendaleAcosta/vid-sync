import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import roomReducer from "./roomReducer";
import youtubeReducer from "./youtubeReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  modalReducer,
  roomReducer,
  youtubeReducer,
  form: formReducer,
});
