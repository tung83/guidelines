import * as actions from "store/actionNames";

export function childrenFetchAll() {
  return {
    type: actions.CHILDREN_FETCH_ALL
  };
} 
export function childrenFetch(studyClassId) {
  return {
    type: actions.CHILDREN_FETCH,
    studyClassId: studyClassId
  };
}
export function childrenFetchDetail(id) {
  return {
    type: actions.CHILDREN_FETCH_DETAIL,
    id: id
  };
}

export function childrenPost(payload) {
  return {
    type: actions.CHILDREN_POST,
    payload: payload
  };
}
export function childrenPut(id, payload) {
  return {
    type: actions.CHILDREN_PUT,
    payload: payload,
    id: id
  };
}

export function childrenDelete(id) {
  return {
    type: actions.CHILDREN_DELETE,
    id: id
  };
}

export function childrenUploadPhoto(file, payload) {
  return {
    type: actions.CHILDREN_POST_PHOTO,
    file: file,
    payload: payload
  };
}
