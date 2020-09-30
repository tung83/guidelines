import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
const baseUrl = "foods";

// foodFetchAsync
function* foodFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.FOOD_FETCH_RECEIVED,
    foods: data || [],
  });
}

function* watchFoodAsync() {
  yield takeLatest(actions.FOOD_FETCH, foodFetchAsync);
}

// foodFetchDetailAsync
function* foodFetchDetailAsync(action) {
  let data = null;
  if (action.id) {
    let result = yield call(get, `${baseUrl}/${action.id}`);
    data = result.data;
  }
  yield put({
    type: actions.FOOD_FETCH_DETAIL_RECEIVED,
    food: data,
  });
}
function* watchfoodFetchDetailAsync() {
  yield takeLatest(actions.FOOD_FETCH_DETAIL, foodFetchDetailAsync);
}

// foodPostAsync
function* foodPostAsync(action) {
  yield call(post, baseUrl, action.payload);
  yield call(foodFetchAsync);
}

function* watchFoodPostAsync() {
  yield takeLatest(actions.FOOD_POST, foodPostAsync);
}

// foodPutAsync
function* foodPutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(foodFetchAsync);
}

function* watchFoodPutAsync() {
  yield takeLatest(actions.FOOD_PUT, foodPutAsync);
}

// foodDeleteAsync
function* foodDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(foodFetchAsync);
}
function* watchFoodDeleteAsync() {
  yield takeLatest(actions.FOOD_DELETE, foodDeleteAsync);
}

export default [
  watchFoodPostAsync(),
  watchFoodPutAsync(),
  watchFoodAsync(),
  watchfoodFetchDetailAsync(),
  watchFoodDeleteAsync(),
];
