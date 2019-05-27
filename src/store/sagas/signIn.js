import { call, put } from "redux-saga/effects";

import { navigate } from "../../services/navigation";
import api from "../../services/api";
import SignInActions from "../ducks/signIn";
import UserActions from "../ducks/user";
import PreferencesActions from "../ducks/preferences";

export default function* signIn({ email, password, firstTime }) {
  try {
    const response = yield call(api.post, "/login", { email, password });

    const { user } = response.data;
    yield put(SignInActions.signInSuccess(response.data.token));
    yield put(UserActions.loadUserSuccess(user));

    if (firstTime) {
      yield put(PreferencesActions.loadPreferencesRequest());
    }

    const nextPage = firstTime ? "Preferencias" : "App";

    navigate(nextPage);
  } catch (err) {
    yield put(SignInActions.signInFailure());
  }
}
