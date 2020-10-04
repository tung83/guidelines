import * as actions from "store/actionNames";
import { BaseAction } from "../common";
import { NodeData } from "../../model";

const initialState = {
  guideNodes: [],
  guideNodesInserted: [],
  currentGuideNode: null,
};

export interface IGuideNodeState {
  guideNodes: NodeData[];
  guideNodesInserted: NodeData[];
  currentGuideNode: NodeData | null;
}
export default function guideNodeReducer(
  state: IGuideNodeState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.GUIDE_NODE_FETCH_RECEIVED:
      return { ...state, ...{ guideNodes: action.payload as NodeData[] } };
    case actions.GUIDE_NODE_INSERT_RECEIVED:
      return {
        ...state,
        ...{
          guideNodesInserted: [...state.guideNodesInserted, action.payload],
        },
      };
    case actions.GUIDE_NODE_INSERT_RESET:
      return {
        ...state,
        ...{
          guideNodesInserted: [],
        },
      };
    case actions.GUIDE_NODE_CONTENT_CHECKED_NODE:
      return {
        ...state,
        ...{
          currentGuideNode: action.payload,
        },
      };
    default:
      return state;
  }
}
