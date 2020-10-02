import * as actions from "store/actionNames";
import { BaseAction } from "../common";

const initialState = {
  guidelines: [],
  currentGuideline: null,
  onGuidelineSelected: -1,
};

export default function guidelineReducer(
  state = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDELINE_FETCH_RECEIVED:
      return { ...state, ...{ guidelines: action.payload } };
    case actions.GUIDELINE_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentGuideline: action.payload } };
    case actions.ON_GUIDELINE_SELECTED:
      return { ...state, ...{ onGuidelineSelected: action.id } };

    default:
      return state;
  }
}
