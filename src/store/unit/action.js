import * as actions from "store/actionNames";

export function unitFetch() {
  return {
    type: actions.UNIT_FETCH,
  };
}
export function unitFetchDetail(id) {
  return {
    type: actions.UNIT_FETCH_DETAIL,
    id: id,
  };
}

export function unitPost(payload) {
  return {
    type: actions.UNIT_POST,
    payload: payload,
  };
}
export function unitPut(id, payload) {
  return {
    type: actions.UNIT_PUT,
    payload: payload,
    id: id,
  };
}
export function unitDelete(id) {
  return {
    type: actions.UNIT_DELETE,
    id: id,
  };
}
