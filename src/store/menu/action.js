import * as actions from "store/actionNames";

export function menuFetch() {
  return {
    type: actions.MENU_FETCH,
  };
}
export function menuFetchDetail(date) {
  return {
    type: actions.MENU_FETCH_DETAIL,
    date,
  };
}

export function menuPost(date, payload) {
  return {
    type: actions.MENU_POST,
    payload,
    date,
  };
}
export function menuPut(id, date, payload) {
  return {
    type: actions.MENU_PUT,
    payload,
    id,
    date,
  };
}
export function menuDelete(id) {
  return {
    type: actions.MENU_DELETE,
    id: id,
  };
}
export function menuOnSaveClicked(foods) {
  return {
    type: actions.MENU_ON_SAVE_CLICKED,
    foods,
  };
}
export function menuOnPutMenu(menu) {
  return {
    type: actions.MENU_ON_PUT_FOODS,
    menu,
  };
}

export function menuUploadPhoto(file, payload, index) {
  return {
    type: actions.MENU_POST_PHOTO,
    file: file,
    index: index,
    payload: payload,
  };
}
