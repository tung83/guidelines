import * as actions from "store/actionNames";

export function guidelineFetch() {
  return {
    type: actions.GUIDELINE_FETCH,
  };
}
export function guidelineFetchDetail(id) {
  return {
    type: actions.GUIDELINE_FETCH_DETAIL,
    id: id,
  };
}

export function guidelinePost(payload) {
  return {
    type: actions.GUIDELINE_POST,
    payload: payload,
  };
}
export function guidelinePut(id, payload) {
  return {
    type: actions.GUIDELINE_PUT,
    payload: payload,
    id: id,
  };
}
export function guidelineDelete(id) {
  return {
    type: actions.GUIDELINE_DELETE,
    id: id,
  };
}
export function onGuidelineSelected(id) {
  return {
    type: actions.ON_GUIDELINE_SELECTED,
    id: id,
  };
}
