import { call, put, select } from "redux-saga/effects";

import api from "../../services/api";
import PreferencesActions from "../ducks/preferences";

export default function* loadPreferences() {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    const response = yield call(api.get, "/preferences", requestConfig);

    yield put(PreferencesActions.loadPreferencesSuccess(response.data));
  } catch (err) {
    yield put(PreferencesActions.loadPreferencesFailure());
  }
}
