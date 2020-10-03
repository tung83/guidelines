import * as actions from "store/actionNames";
import { BaseAction } from "../common";
export const guideNodeContentFetchDetail = (id: number): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_FETCH_DETAIL,
    id: id,
  };
};
export const guideNodeContentPost = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_POST,
    payload: payload,
  };
};
export const guideNodeContentPut = (id: number, payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_PUT,
    payload: payload,
    id: id,
  };
};
