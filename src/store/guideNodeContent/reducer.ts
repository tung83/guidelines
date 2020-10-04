import * as actions from "store/actionNames";
import { BaseAction } from "../common";
import { NodeContent } from "../../model";

const initialState = {
  currentGuideNodeContent: null,
};

export interface IGuideNodeContentState {
  currentGuideNodeContent: NodeContent | null;
}
export default function guideNodeContentReducer(
  state: IGuideNodeContentState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDE_NODE_CONTENT_FETCH_DETAIL_RECEIVED:
      return {
        ...state,
        ...{
          currentGuideNodeContent: action.payload,
        },
      };
    default:
      return state;
  }
}
