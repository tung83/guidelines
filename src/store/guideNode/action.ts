import * as actions from "store/actionNames";
import { BaseAction } from "../common";
export const guideNodeFetch = (): BaseAction => {
  return {
    type: actions.GUIDE_NODE_FETCH,
  };
};
export const guideNodeSetCurrent = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_CHECKED_NODE,
    payload: payload,
  };
};
export const guideNodePost = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_POST,
    payload: payload,
  };
};
export const guideNodePut = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_PUT,
    payload: payload,
  };
};
export const guideNodeLocationPut = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_LOCATION_PUT,
    payload: payload,
  };
};

export const guideNodeDelete = (id: string): BaseAction => {
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
