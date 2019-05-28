import { call, put, select } from "redux-saga/effects";

import { navigate } from "../../services/navigation";
import api from "../../services/api";
import UserMeetupsActions from "../ducks/userMeetups";

export function* loadUserMeetups({ id }) {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    const dashboard = yield call(api.get, `/dashboard`, requestConfig);

    const data = {
      next: dashboard.data.nextMeetups,
      registrations: dashboard.data.subscriptions,
      recomended: dashboard.data.nextRecommended,
      search: []
    };

    yield put(UserMeetupsActions.loadUserMeetupsSuccess(data));
  } catch (err) {
    yield put(UserMeetupsActions.loadUserMeetupsFailure());
  }
}

export function* saveNewMeetup({ data }) {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    const requestConfigFile = {
      headers: {
        Authorization: `bearer ${userAuthToken}`,
        "Content-Type": "multipart/form-data"
      }
    };

    const dataFile = new FormData();
    const fileURL = data.imageURL.uri;
    const fileName = fileURL.split("/").pop();
    const ext = fileURL.split(".").pop();
    dataFile.append("file", {
      uri: fileURL, // your file path string
      name: fileName,
      type: "image/" + ext
    });

    const response = yield call(
      api.post,
      "/files",
      dataFile,
      requestConfigFile
    );
    data.file_id = response.data.file.id;
    yield call(api.post, "/meetup", data, requestConfig);

    yield put(UserMeetupsActions.saveNewMeetupSuccess());
    yield put(UserMeetupsActions.loadUserMeetupsRequest(data.owner_id));
    navigate("Dashboard");
  } catch (err) {
    yield put(UserMeetupsActions.saveNewMeetupFailure());
  }
}

export function* searchMeetups({ searchTerm }) {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    const response = yield call(
      api.get,
      `/dashboard?s=${searchTerm}`,
      requestConfig
    );

    const data = {
      next: response.data.nextMeetups,
      registrations: response.data.subscriptions,
      recomended: response.data.nextRecommended,
      search: response.data.search
    };

    yield put(UserMeetupsActions.searchMeetupsSuccess(data));
  } catch (err) {
    yield put(UserMeetupsActions.searchMeetupsFailure());
  }
}

export function* registerInMeetup({ userId, meetupId }) {
  try {
    const userAuthToken = yield select(state => state.signIn.token);

    const requestConfig = {
      headers: { Authorization: `bearer ${userAuthToken}` }
    };

    yield call(
      api.post,
      `/meetup/subscription`,
      { meetup_id: meetupId },
      requestConfig
    );

    yield put(UserMeetupsActions.registerInMeetupSuccess());
    yield put(UserMeetupsActions.loadUserMeetupsRequest(userId));
    navigate("Dashboard");
  } catch (err) {
    yield put(UserMeetupsActions.registerInMeetupFailure());
  }
}
