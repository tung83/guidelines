import * as actions from "store/actionNames";

export function guideNodeFetch() {
  return {
    type: actions.GUIDE_NODE_FETCH,
  };
}
export function guideNodeFetchDetail(id) {
  return {
    type: actions.GUIDE_NODE_FETCH_DETAIL,
    id: id,
  };
}

export function guideNodePost(payload) {
  return {
    type: actions.GUIDE_NODE_POST,
    payload: payload,
  };
}
export function guideNodePut(id, payload) {
  return {
    type: actions.GUIDE_NODE_PUT,
    payload: payload,
    id: id,
  };
}
export function guideNodeDelete(id) {
  return {
    type: actions.GUIDE_NODE_DELETE,
    id: id,
  };
}
