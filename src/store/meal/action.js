import * as actions from "store/actionNames";

export function mealFetch() {
  return {
    type: actions.MEAL_FETCH,
  };
}
export function mealFetchDetail(id) {
  return {
    type: actions.MEAL_FETCH_DETAIL,
    id: id,
  };
}

export function mealPost(payload) {
  return {
    type: actions.MEAL_POST,
    payload: payload,
  };
}
export function mealPut(id, payload) {
  return {
    type: actions.MEAL_PUT,
    payload: payload,
    id: id,
  };
}
export function mealDelete(id) {
  return {
    type: actions.MEAL_DELETE,
    id: id,
  };
}
