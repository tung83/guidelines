import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "node";

// guideNodePostAsync
function* guideNodePostAsync(action: BaseAction) {
  let { data } = yield call(post, baseUrl, action.payload);
  yield put({
    type: actions.GUIDE_NODE_INSERT_RECEIVED,
    payload: { ...data, key: action.payload.key },
  });
}

function* watchGuideNodePostAsync() {
  yield takeEvery(actions.GUIDE_NODE_POST, guideNodePostAsync);
}

// guideNodePutAsync
function* guideNodePutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}/savename`, action.payload);
}

function* watchGuideNodePutAsync() {
  yield takeEvery(actions.GUIDE_NODE_PUT, guideNodePutAsync);
}

// guideNodePutAsync
function* guideNodeLocationPutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}/updateLocation`, action.payload);
}

function* watchGuideNodeLocationPutAsync() {
  yield takeEvery(actions.GUIDE_NODE_LOCATION_PUT, guideNodeLocationPutAsync);
}
// guideNodeDeleteAsync
function* guideNodeDeleteAsync(action: BaseAction) {
  yield call(del, `${baseUrl}/${action.id}`);
}
function* watchGuideNodeDeleteAsync() {
  yield takeEvery(actions.GUIDE_NODE_DELETE, guideNodeDeleteAsync);
}

export default [
  watchGuideNodePostAsync(),
  watchGuideNodePutAsync(),
  watchGuideNodeLocationPutAsync(),
  watchGuideNodeDeleteAsync(),
];
