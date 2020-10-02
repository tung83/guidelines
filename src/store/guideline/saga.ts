import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "guidelines";

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
    let result = yield call(get, `${baseUrl}/${action.id}`);
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

// guidelinePostAsync
function* guidelinePostAsync(action: BaseAction) {
  yield call(post, baseUrl, action.payload);
  yield call(guidelineFetchAsync);
}

function* watchGuidelinePostAsync() {
  yield takeLatest(actions.GUIDELINE_POST, guidelinePostAsync);
}

// guidelinePutAsync
function* guidelinePutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(guidelineFetchAsync);
}

function* watchGuidelinePutAsync() {
  yield takeLatest(actions.GUIDELINE_PUT, guidelinePutAsync);
}

// guidelineDeleteAsync
function* guidelineDeleteAsync(action: BaseAction) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(guidelineFetchAsync);
}
function* watchGuidelineDeleteAsync() {
  yield takeLatest(actions.GUIDELINE_DELETE, guidelineDeleteAsync);
}

export default [
  watchGuidelinePostAsync(),
  watchGuidelinePutAsync(),
  watchGuidelineAsync(),
  watchguidelineFetchDetailAsync(),
  watchGuidelineDeleteAsync(),
];
