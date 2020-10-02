import * as actions from "store/actionNames";
import { BaseAction } from "../common";
import { NodeData } from "../../model";

const initialState = {
  guideNodes: [],
  currentGuideNode: null,
};

export interface IGuideNodeState {
  guideNodes: NodeData[];
  currentGuideNode: NodeData | null;
}
export default function guideNodeReducer(
  state: IGuideNodeState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDE_NODE_FETCH_RECEIVED:
      return { ...state, ...{ guideNodes: action.payload as NodeData[] } };
    case actions.GUIDE_NODE_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentGuideNode: action.payload } };
    default:
      return state;
  }
}
