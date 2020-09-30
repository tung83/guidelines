import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
const baseUrl = "meals";

// mealFetchAsync
function* mealFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.MEAL_FETCH_RECEIVED,
    meals: data || [],
  });
}

function* watchMealAsync() {
  yield takeLatest(actions.MEAL_FETCH, mealFetchAsync);
}

// mealFetchDetailAsync
function* mealFetchDetailAsync(action) {
  let data = null;
  if (action.id) {
    let result = yield call(get, `${baseUrl}/${action.id}`);
    data = result.data;
  }
  yield put({
    type: actions.MEAL_FETCH_DETAIL_RECEIVED,
    meal: data || null,
  });
}
function* watchMealFetchDetailAsync() {
  yield takeLatest(actions.MEAL_FETCH_DETAIL, mealFetchDetailAsync);
}

// mealPostAsync
function* mealPostAsync(action) {
  yield call(post, baseUrl, action.payload);
  yield call(mealFetchAsync);
}

function* watchMealPostAsync() {
  yield takeLatest(actions.MEAL_POST, mealPostAsync);
}

// mealPutAsync
function* mealPutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(mealFetchAsync);
}

function* watchMealPutAsync() {
  yield takeLatest(actions.MEAL_PUT, mealPutAsync);
}

// mealDeleteAsync
function* mealDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
  yield call(mealFetchAsync);
}
function* watchMealDeleteAsync() {
  yield takeLatest(actions.MEAL_DELETE, mealDeleteAsync);
}

export default [
  watchMealPostAsync(),
  watchMealPutAsync(),
  watchMealAsync(),
  watchMealFetchDetailAsync(),
  watchMealDeleteAsync(),
];
