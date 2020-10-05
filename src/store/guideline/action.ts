import * as actions from "store/actionNames";
import { BaseAction } from "../common";

export function guidelineFetch(): BaseAction {
  return {
    type: actions.GUIDELINE_FETCH,
  };
}
export function guidelineFetchDetail(id: string): BaseAction {
  return {
    type: actions.GUIDELINE_FETCH_DETAIL,
    id: id,
  };
}

export function onGuidelineSelected(payload: any): BaseAction {
  return {
    type: actions.ON_GUIDELINE_SELECTED,
    payload,
  };
}
