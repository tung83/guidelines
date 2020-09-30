import { get, post, put as putApi, del } from "utils/apiCall";
import { put, call, takeLatest } from "redux-saga/effects";
import { menuFetchDetail } from "./action";
import * as actions from "store/actionNames";
const baseUrl = "menus";

// menuFetchAsync
function* menuFetchAsync() {
  let { data } = yield call(get, baseUrl);
  yield put({
    type: actions.MENU_FETCH_RECEIVED,
    stories: data || [],
  });
}

function* watchMenuAsync() {
  yield takeLatest(actions.MENU_FETCH, menuFetchAsync);
}

// menuFetchDetailAsync
function* menuFetchDetailAsync(action) {
  let data = null;
  if (action.date) {
    let result = yield call(get, `${baseUrl}/${action.date}`);
    data = result.data;
  }
  yield put({
    type: actions.MENU_FETCH_DETAIL_RECEIVED,
    menu: data,
  });
}
function* watchmenuFetchDetailAsync() {
  yield takeLatest(actions.MENU_FETCH_DETAIL, menuFetchDetailAsync);
}

// menuPostAsync
function* menuPostAsync(action) {
  yield call(post, baseUrl, action.payload);
  yield call(menuFetchDetailAsync, { date: action.date });
}

function* watchMenuPostAsync() {
  yield takeLatest(actions.MENU_POST, menuPostAsync);
}

// menuPutAsync
function* menuPutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);
  yield call(menuFetchDetailAsync, { date: action.date });
}

function* watchMenuPutAsync() {
  yield takeLatest(actions.MENU_PUT, menuPutAsync);
}

// menuDeleteAsync
function* menuDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
}
function* watchMenuDeleteAsync() {
  yield takeLatest(actions.MENU_DELETE, menuDeleteAsync);
}

function* uploadMenuPhotoAsync(action) {
  var formData = new FormData();
  formData.append("file", action.file);
  formData.append("id", action.payload.id);
  formData.append("index", action.index);
  let children = action.payload.childrenList
    .map((x) => `${x.id}_${x.name}`)
    .join(",");
  formData.append("children", children.toString());
  yield call(post, `${baseUrl}/uploadPhoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function* watchUploadMenuPhotoAsync() {
  yield takeLatest(actions.MENU_POST_PHOTO, uploadMenuPhotoAsync);
}
export default [
  watchMenuPostAsync(),
  watchMenuPutAsync(),
  watchMenuAsync(),
  watchmenuFetchDetailAsync(),
  watchMenuDeleteAsync(),
  watchUploadMenuPhotoAsync(),
];
