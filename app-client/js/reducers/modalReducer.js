import {
  TOGGLE_MODAL
} from 'actions/modalActions';

const initialState = {
  modal: false,
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };

    default:
      return state;
  }
}
