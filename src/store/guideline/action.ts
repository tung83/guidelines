import * as actions from "store/actionNames";
import store from "store";
import { guideNodeContentReset } from "../guideNodeContent/action";
import { guideNodeSetCurrent } from "../guideNode/action";
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
  store.dispatch(guideNodeContentReset());
  store.dispatch(guideNodeSetCurrent(null));
  return {
    type: actions.ON_GUIDELINE_SELECTED,
    payload,
  };
}
