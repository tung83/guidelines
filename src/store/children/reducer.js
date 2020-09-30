import * as actions from "store/actionNames";

const initialState = {
  allChildren: [],
  children: [],
  currentChild: null
};

export default function childrenReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHILDREN_FETCH_RECEIVED:
      return { ...state, ...{ children: action.children } };
      case actions.CHILDREN_FETCH_ALL_RECEIVED:
        return { ...state, ...{ allChildren: action.children } };
    case actions.CHILDREN_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentChild: action.child } };
    default:
      return state;
  }
}
