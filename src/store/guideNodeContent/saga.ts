import { get, put as putApi } from "utils/apiCall";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import * as actions from "store/actionNames";
import { BaseAction } from "../common";
const baseUrl = "nodecontent";

function* guideNodeContentFetchDetailAsync(action: BaseAction) {
  let { data } = yield call(get, `${baseUrl}?nodeId=${action.id}`);
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

// guideNodeContentPutAsync
function* guideNodeContentPutAsync(action: BaseAction) {
  yield call(putApi, `${baseUrl}`, action.payload);
}

function* watchGuideNodePutAsync() {
  yield takeEvery(actions.GUIDE_NODE_CONTENT_PUT, guideNodeContentPutAsync);
}

export default [watchGuideNodePutAsync(), watchGuideNodeFetchDetailAsync()];
