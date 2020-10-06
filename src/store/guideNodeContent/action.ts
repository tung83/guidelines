import * as actions from "store/actionNames";
import { BaseAction } from "../common";
export const guideNodeContentFetchDetail = (id: string): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_FETCH_DETAIL,
    id: id,
  };
};
export const guideNodeContentReset = (): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_FETCH_DETAIL_RECEIVED,
    payload: null,
  };
};

export const guideNodeContentPut = (payload: any): BaseAction => {
  return {
    type: actions.GUIDE_NODE_CONTENT_PUT,
    payload: payload,
  };
};
