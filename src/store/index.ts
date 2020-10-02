import rootSaga, { reducers } from "./rootReduxSaga";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, compose, applyMiddleware } from "redux";
/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();
/** Create middlewares for redux */
let middlewares = applyMiddleware(sagaMiddleware);
/** Create redux store */
const store = createStore(reducers, composeWithDevTools(compose(middlewares)));
/** run saga watchers */
sagaMiddleware.run(rootSaga);
export default store;
