import childrenSaga from "./children/saga";
import appSaga from "./app/saga";
import guidelineSaga from "./guideline/saga";
import mealSaga from "./meal/saga";
import guideNodeSaga from "./guideNode/saga";
import { all } from "redux-saga/effects";

import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import children from "./children/reducer";
import guideline from "./guideline/reducer";
import meal from "./meal/reducer";
import guideNode from "./guideNode/reducer";
import app from "./app/reducer";

export const reducers = combineReducers({
  router,
  app,
  children,
  guideline,
  meal,
  guideNode,
});

export default function* rootSaga() {
  yield all([
    ...childrenSaga,
    ...appSaga,
    ...guidelineSaga,
    ...mealSaga,
    ...guideNodeSaga,
  ]);
}
