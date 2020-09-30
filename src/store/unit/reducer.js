import * as actions from "store/actionNames";

const initialState = {
  units: [],
  currentUnit: null,
};

export default function unitReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UNIT_FETCH_RECEIVED:
      return { ...state, ...{ units: action.units } };
    case actions.UNIT_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentUnit: action.unit } };
    default:
      return state;
  }
}
