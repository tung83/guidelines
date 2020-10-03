import * as actions from "store/actionNames";
import { BaseAction } from "../common";
export const guideNodeFetch = (): BaseAction => {
  return {
    type: actions.GUIDE_NODE_FETCH,
  };
};
export const guideNodePost = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_POST,
    payload: payload,
  };
};
export const guideNodePut = (id: number, payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_PUT,
    payload: payload,
    id: id,
  };
};
export const guideNodeDelete = (id: number): BaseAction => {
  return {
    type: actions.GUIDE_NODE_DELETE,
    id: id,
  };
};
export const resetGuideNodesInserted = (): BaseAction => {
  return {
    type: actions.GUIDE_NODE_INSERT_RESET,
  };
};
