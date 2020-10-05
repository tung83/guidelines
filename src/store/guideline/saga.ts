import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "node";

// guidelineFetchAsync
function* guidelineFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.GUIDELINE_FETCH_RECEIVED,
    payload: data || [],
  } as BaseAction);
}

function* watchGuidelineAsync() {
  yield takeLatest(actions.GUIDELINE_FETCH, guidelineFetchAsync);
}

// guidelineFetchDetailAsync
function* guidelineFetchDetailAsync(action: BaseAction) {
  let data = null;
  if (action.id) {
    let result = yield call(get, `${baseUrl}?supId=${action.id}`);
    data = result.data;
  }
  yield put({
    type: actions.GUIDELINE_FETCH_DETAIL_RECEIVED,
    payload: data,
  } as BaseAction);
}
function* watchguidelineFetchDetailAsync() {
  yield takeLatest(actions.GUIDELINE_FETCH_DETAIL, guidelineFetchDetailAsync);
}

export default [watchGuidelineAsync(), watchguidelineFetchDetailAsync()];
