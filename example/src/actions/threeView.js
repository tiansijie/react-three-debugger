import * as types from '../constants/threeView';

export function setSelection(selected) {
  return { type: types.SET_SELECTION, selected }
}
