import * as actions from "store/actionNames";
import { BaseAction } from "../common";
import { NodeContent } from "../../model";

const initialState = {
  currentGuideNodeContent: null,
  currentGuideNodeContentId: null,
};

export interface IGuideNodeContentState {
  currentGuideNodeContent: NodeContent | null;
  currentGuideNodeContentId: number | null;
}
export default function guideNodeContentReducer(
  state: IGuideNodeContentState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDE_NODE_CONTENT_FETCH_DETAIL_RECEIVED:
      debugger;
      return {
        ...state,
        ...{
          currentGuideNodeContent: action.payload,
          currentGuideNodeContentId: action.id,
        },
      };
    default:
      return state;
  }
}
