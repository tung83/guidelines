import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "nodes";

// guideNodeFetchAsync
function* guideNodeFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.GUIDE_NODE_FETCH_RECEIVED,
    payload: data || [],
  });
}

function* watchGuideNodeAsync() {
  yield takeLatest(actions.GUIDE_NODE_FETCH, guideNodeFetchAsync);
}
// guideNodePostAsync
function* guideNodePostAsync(action: BaseAction) {
  let { data } = yield call(post, baseUrl, action.payload);
  yield put({
    type: actions.GUIDE_NODE_INSERT_RECEIVED,
    payload: data,
  });
}

function* watchGuideNodePostAsync() {
  yield takeEvery(actions.GUIDE_NODE_POST, guideNodePostAsync);
}

// guideNodePutAsync
function* guideNodePutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
}

function* watchGuideNodePutAsync() {
  yield takeEvery(actions.GUIDE_NODE_PUT, guideNodePutAsync);
}

// guideNodeDeleteAsync
function* guideNodeDeleteAsync(action: BaseAction) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(guideNodeFetchAsync);
}
function* watchGuideNodeDeleteAsync() {
  yield takeEvery(actions.GUIDE_NODE_DELETE, guideNodeDeleteAsync);
}

export default [
  watchGuideNodePostAsync(),
  watchGuideNodePutAsync(),
  watchGuideNodeAsync(),
  watchGuideNodeDeleteAsync(),
];
