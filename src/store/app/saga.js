import { put, call, takeLatest } from "redux-saga/effects";
import { get } from "utils/apiCall";
import * as actions from "store/actionNames";

function* appFetchUserAsync() {
  let { data } = yield call(get, "user");
  yield put({
    type: actions.APP_FETCH_USER_RECEIVED,
    user: data || [],
  });
}

function* watchAppFetchUserAsync() {
  yield takeLatest(actions.APP_FETCH_USER, appFetchUserAsync);
}

export default [watchAppFetchUserAsync()];
