import * as actions from "store/actionNames";
import { BaseAction } from "../common";
import { NodeData } from "../../model";

export interface IGuidelineState {
  guidelines: NodeData[];
  currentChildNodes: NodeData[] | [];
  onGuidelineSelected: number | string;
}
const initialState = {
  guidelines: [],
  currentChildNodes: [],
  onGuidelineSelected: -1,
};

export default function guidelineReducer(
  state: IGuidelineState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDELINE_FETCH_RECEIVED:
      return { ...state, ...{ guidelines: action.payload } };
    case actions.GUIDELINE_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentChildNodes: action.payload } };
    case actions.ON_GUIDELINE_SELECTED:
      return { ...state, ...{ onGuidelineSelected: action.id } };

    default:
      return state;
  }
}
