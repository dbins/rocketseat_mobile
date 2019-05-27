import { call, put, select } from "redux-saga/effects";

import { navigate } from "../../services/navigation";
import api from "../../services/api";
import UserActions from "../ducks/user";
import SignInActions from "../ducks/signIn";
import UserMeetupsActions from "../ducks/userMeetups";
export default function* updateUser({ id, fieldsToUpdate }) {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    const response = yield call(
      api.put,
      `/profile`,
      fieldsToUpdate,
      requestConfig
    );

    yield put(UserActions.updateUserSuccess(response.data));
    yield put(UserActions.loadUserSuccess(response.data.user));
    if (fieldsToUpdate.email) {
      yield put(
        SignInActions.signInRequest(
          fieldsToUpdate.email,
          fieldsToUpdate.password
        )
      );
    }
    yield put(UserMeetupsActions.loadUserMeetupsRequest(response.data.user.id));
    navigate("Dashboard");
  } catch (err) {
    yield put(UserActions.updateUserFailure());
  }
}
