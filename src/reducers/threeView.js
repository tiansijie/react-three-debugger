import { SET_SELECTION } from "../constants/threeView";

const initialState = {
    selected: {}
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTION:
      return state.selected = action.selected
    default:
      return state
  }
}
