import childrenSaga from "./children/saga";
import appSaga from "./app/saga";
import foodSaga from "./food/saga";
import mealSaga from "./meal/saga";
import menuSaga from "./menu/saga";
import unitSaga from "./unit/saga";
import { all } from "redux-saga/effects";

import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import children from "./children/reducer";
import food from "./food/reducer";
import meal from "./meal/reducer";
import menu from "./menu/reducer";
import unit from "./unit/reducer";
import app from "./app/reducer";

export const reducers = combineReducers({
  router,
  app,
  children,
  food,
  meal,
  menu,
  unit,
});

export default function* rootSaga() {
  yield all([
    ...childrenSaga,
    ...appSaga,
    ...foodSaga,
    ...mealSaga,
    ...menuSaga,
    ...unitSaga,
  ]);
}
