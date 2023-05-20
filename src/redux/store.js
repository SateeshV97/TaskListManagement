import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/TaskSlice.js";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./slices/saga.js";
import logger from "redux-logger";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware, logger),
});
sagaMiddleware.run(rootSaga);
export default store;
