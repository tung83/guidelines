import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
const baseUrl = "guideNodes";

// guideNodeFetchAsync
function* guideNodeFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.GUIDE_NODE_FETCH_RECEIVED,
    guideNodes: data || [],
  });
}

function* watchGuideNodeAsync() {
  yield takeLatest(actions.GUIDE_NODE_FETCH, guideNodeFetchAsync);
}

// guideNodeFetchDetailAsync
function* guideNodeFetchDetailAsync(action) {
  let data = null;
  if (action.id) {
    let result = yield call(get, `${baseUrl}/${action.id}`);
    data = result.data;
  }
  yield put({
    type: actions.GUIDE_NODE_FETCH_DETAIL_RECEIVED,
    guideNode: data,
  });
}
function* watchguideNodeFetchDetailAsync() {
  yield takeLatest(actions.GUIDE_NODE_FETCH_DETAIL, guideNodeFetchDetailAsync);
}

// guideNodePostAsync
function* guideNodePostAsync(action) {
  yield call(post, baseUrl, action.payload);
  yield call(guideNodeFetchAsync);
}

function* watchGuideNodePostAsync() {
  yield takeLatest(actions.GUIDE_NODE_POST, guideNodePostAsync);
}

// guideNodePutAsync
function* guideNodePutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(guideNodeFetchAsync);
}

function* watchGuideNodePutAsync() {
  yield takeLatest(actions.GUIDE_NODE_PUT, guideNodePutAsync);
}

// guideNodeDeleteAsync
function* guideNodeDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(guideNodeFetchAsync);
}
function* watchGuideNodeDeleteAsync() {
  yield takeLatest(actions.GUIDE_NODE_DELETE, guideNodeDeleteAsync);
}

export default [
  watchGuideNodePostAsync(),
  watchGuideNodePutAsync(),
  watchGuideNodeAsync(),
  watchguideNodeFetchDetailAsync(),
  watchGuideNodeDeleteAsync(),
];
