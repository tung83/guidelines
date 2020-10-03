import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "nodecontents";

function* guideNodeContentFetchDetailAsync(action: BaseAction) {
  let { data } = yield call(get, `${baseUrl}/${action.id}`);

  yield put({
    type: actions.GUIDE_NODE_CONTENT_FETCH_DETAIL_RECEIVED,
    payload: data,
    id: action.id,
  });
}
function* watchGuideNodeFetchDetailAsync() {
  yield takeLatest(
    actions.GUIDE_NODE_CONTENT_FETCH_DETAIL,
    guideNodeContentFetchDetailAsync
  );
}
// guideNodeContentPostAsync
function* guideNodeContentPostAsync(action: BaseAction) {
  yield call(post, baseUrl, action.payload);
}

function* watchGuideNodePostAsync() {
  yield takeEvery(actions.GUIDE_NODE_CONTENT_POST, guideNodeContentPostAsync);
}

// guideNodeContentPutAsync
function* guideNodeContentPutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
}

function* watchGuideNodePutAsync() {
  yield takeEvery(actions.GUIDE_NODE_CONTENT_PUT, guideNodeContentPutAsync);
}

export default [
  watchGuideNodePostAsync(),
  watchGuideNodePutAsync(),
  watchGuideNodeFetchDetailAsync(),
];
