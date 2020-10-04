import nodeNavSaga from "./nodeNav/saga";
import appSaga from "./app/saga";
import guidelineSaga from "./guideline/saga";
import guideNodeSaga from "./guideNode/saga";
import guideNodeContentSaga from "./guideNodeContent/saga";
import { all } from "redux-saga/effects";

import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import nodeNav from "./nodeNav/reducer";
import guideline from "./guideline/reducer";
import guideNode from "./guideNode/reducer";
import guideNodeContent from "./guideNodeContent/reducer";

import app from "./app/reducer";

export const reducers = combineReducers({
  router,
  app,
  nodeNav,
  guideline,
  guideNode,
  guideNodeContent,
});

export default function* rootSaga() {
  yield all([
    ...nodeNavSaga,
    ...appSaga,
    ...guidelineSaga,
    ...guideNodeSaga,
    ...guideNodeContentSaga,
  ]);
}
