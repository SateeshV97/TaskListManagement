// saga.js
import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { taskActions } from "./TaskActions";
import { setJokesData, setLoading } from "./TaskSlice";

// function uses axios to fetch data from our api
let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data,
  });
};

export function* fetchJokeApi() {
  try {
    yield put(setLoading(true));
    let result = yield call(() =>
      callAPI({
        url: "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10",
        method: "GET",
      })
    );
    yield put(setJokesData(result?.data?.jokes));
    yield put(setLoading(false));
  } catch (e) {
    yield put({ type: "FETCH_JOKE_API" });
  }
}
export default function* rootSaga() {
  yield takeEvery(taskActions.FETCH_JOKE_API, fetchJokeApi);
}
