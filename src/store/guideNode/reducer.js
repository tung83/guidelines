import * as actions from "store/actionNames";

const initialState = {
  guideNodes: [],
  currentGuideNode: null,
};

export default function guideNodeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GUIDE_NODE_FETCH_RECEIVED:
      return { ...state, ...{ guideNodes: action.guideNodes } };
    case actions.GUIDE_NODE_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentGuideNode: action.guideNode } };
    default:
      return state;
  }
}
