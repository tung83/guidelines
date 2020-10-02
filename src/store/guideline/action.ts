import * as actions from "store/actionNames";
import { BaseAction } from "../common";

export function guidelineFetch(): BaseAction {
  return {
    type: actions.GUIDELINE_FETCH,
  };
}
export function guidelineFetchDetail(id: number): BaseAction {
  return {
    type: actions.GUIDELINE_FETCH_DETAIL,
    id: id,
  };
}

export function guidelinePost(payload: any): BaseAction {
  return {
    type: actions.GUIDELINE_POST,
    payload: payload,
  };
}
export function guidelinePut(id: number, payload: any): BaseAction {
  return {
    type: actions.GUIDELINE_PUT,
    payload: payload,
    id: id,
  };
}
export function guidelineDelete(id: number): BaseAction {
  return {
    type: actions.GUIDELINE_DELETE,
    id: id,
  };
}
export function onGuidelineSelected(id: string): BaseAction {
  return {
    type: actions.ON_GUIDELINE_SELECTED,
    id: id,
  };
}
