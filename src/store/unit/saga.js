import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
const baseUrl = "units";

// unitFetchAsync
function* unitFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.UNIT_FETCH_RECEIVED,
    units: data || [],
  });
}

function* watchUnitAsync() {
  yield takeLatest(actions.UNIT_FETCH, unitFetchAsync);
}

// unitFetchDetailAsync
function* unitFetchDetailAsync(action) {
  let data = null;
  if (action.id) {
    let result = yield call(get, `${baseUrl}/${action.id}`);
    data = result.data;
  }
  yield put({
    type: actions.UNIT_FETCH_DETAIL_RECEIVED,
    unit: data,
  });
}
function* watchunitFetchDetailAsync() {
  yield takeLatest(actions.UNIT_FETCH_DETAIL, unitFetchDetailAsync);
}

// unitPostAsync
function* unitPostAsync(action) {
  yield call(post, baseUrl, action.payload);
  yield call(unitFetchAsync);
}

function* watchUnitPostAsync() {
  yield takeLatest(actions.UNIT_POST, unitPostAsync);
}

// unitPutAsync
function* unitPutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(unitFetchAsync);
}

function* watchUnitPutAsync() {
  yield takeLatest(actions.UNIT_PUT, unitPutAsync);
}

// unitDeleteAsync
function* unitDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(unitFetchAsync);
}
function* watchUnitDeleteAsync() {
  yield takeLatest(actions.UNIT_DELETE, unitDeleteAsync);
}

export default [
  watchUnitPostAsync(),
  watchUnitPutAsync(),
  watchUnitAsync(),
  watchunitFetchDetailAsync(),
  watchUnitDeleteAsync(),
];
