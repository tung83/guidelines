import * as actions from "store/actionNames";

const initialState = {
  guidelines: [],
  currentGuideline: null,
  onGuidelineSelected: -1,
};

export default function guidelineReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GUIDELINE_FETCH_RECEIVED:
      return { ...state, ...{ guidelines: action.guidelines } };
    case actions.GUIDELINE_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentGuideline: action.guideline } };
    case actions.ON_GUIDELINE_SELECTED:
      return { ...state, ...{ onGuidelineSelected: action.id } };

    default:
      return state;
  }
}
