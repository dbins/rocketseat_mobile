import { call, put } from "redux-saga/effects";

import api from "../../services/api";
import SignUpActions from "../ducks/signUp";

export default function* signUp({ name, email, password }) {
  try {
    yield call(api.post, "/register", {
      username: name,
      email,
      password
    });

    const firstTime = true;

    yield put(SignUpActions.signUpSuccess(email, password, firstTime));
  } catch (err) {
    yield put(SignUpActions.signUpFailure());
  }
}
