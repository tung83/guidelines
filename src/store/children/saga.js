import { get, post, put as putApi, del } from "utils/apiCall";

import { put, call, takeLatest } from "redux-saga/effects";
import * as actions from "store/actionNames";
const baseUrl = "children";

function* childrenFetchAllAsync(action) {
  let { data } = yield call(get, `${baseUrl}`);
  yield put({
    type: actions.CHILDREN_FETCH_ALL_RECEIVED,
    children: data || []
  });
}

function* watchChildrenAllAsync() {
  yield takeLatest(actions.CHILDREN_FETCH_ALL, childrenFetchAllAsync);
}

function* childrenFetchAsync(action) {
  let { data } = yield call(get, `studyclasses/${action.studyClassId}/${baseUrl}`);
  yield put({
    type: actions.CHILDREN_FETCH_RECEIVED,
    children: data || []
  });
}

function* watchChildrenAsync() {
  yield takeLatest(actions.CHILDREN_FETCH, childrenFetchAsync);
}

function* childrenFetchDetailAsync(action) {  
  let data = null
  if(action.id){
    let result = yield call(get, `${baseUrl}/${action.id}`);
    data = result.data
  }
  yield put({
    type: actions.CHILDREN_FETCH_DETAIL_RECEIVED,
    child: data 
  });
}

function* watchChildrenFetchDetailAsync() {
  yield takeLatest(actions.CHILDREN_FETCH_DETAIL, childrenFetchDetailAsync);
}

function* childrenPostAsync(action) {
  yield call(post, baseUrl, action.payload);  
}

function* watchChildrenPostAsync() {
  yield takeLatest(actions.CHILDREN_POST, childrenPostAsync);
}
function* childrenPutAsync(action) {
  yield call(putApi, `${baseUrl}/${action.id}`, action.payload);  
}

function* watchChildrenPutAsync() {
  yield takeLatest(actions.CHILDREN_PUT, childrenPutAsync);
}

function* childrenDeleteAsync(action) {
  yield call(del, `${baseUrl}/${action.id}`);
}
function* watchChildrenDeleteAsync() {
  yield takeLatest(actions.CHILDREN_DELETE, childrenDeleteAsync);
}

function* uploadChildrenPhotoAsync(action) {
  var formData = new FormData();
  formData.append("file", action.file);
  formData.append("id", action.payload.id);
  formData.append("name", action.payload.name);
  yield call(post, `${baseUrl}/uploadPhoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

function* watchUploadChildrenPhotoAsync() {
  yield takeLatest(actions.CHILDREN_POST_PHOTO, uploadChildrenPhotoAsync);
}
export default [
    watchChildrenPostAsync(),
    watchChildrenPutAsync(),
    watchChildrenDeleteAsync(),
    watchChildrenAsync(),
    watchChildrenAllAsync(),
    watchUploadChildrenPhotoAsync(),
    watchChildrenFetchDetailAsync()
  ];
