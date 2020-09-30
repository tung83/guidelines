import * as actions from "store/actionNames";

export function foodFetch() {
  return {
    type: actions.FOOD_FETCH,
  };
}
export function foodFetchDetail(id) {
  return {
    type: actions.FOOD_FETCH_DETAIL,
    id: id,
  };
}

export function foodPost(payload) {
  return {
    type: actions.FOOD_POST,
    payload: payload,
  };
}
export function foodPut(id, payload) {
  return {
    type: actions.FOOD_PUT,
    payload: payload,
    id: id,
  };
}
export function foodDelete(id) {
  return {
    type: actions.FOOD_DELETE,
    id: id,
  };
}
