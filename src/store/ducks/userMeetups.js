import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  loadUserMeetupsRequest: ["id"],
  loadUserMeetupsSuccess: ["data"],
  loadUserMeetupsFailure: null,
  saveNewMeetupRequest: ["data"],
  saveNewMeetupSuccess: null,
  saveNewMeetupFailure: null,
  searchMeetupsRequest: ["searchTerm"],
  searchMeetupsSuccess: ["data"],
  searchMeetupsFailure: null,
  registerInMeetupRequest: ["userId", "meetupId"],
  registerInMeetupSuccess: null,
  registerInMeetupFailure: null
});

export const UserMeetupsTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: {
    next: [],
    registrations: [],
    recomended: [],
    search: []
  },
  loading: false,
  error: false
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_USER_MEETUPS_REQUEST]: state => state.merge({ loading: true }),
  [Types.LOAD_USER_MEETUPS_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false, error: false }),
  [Types.LOAD_USER_MEETUPS_FAILURE]: state =>
    state.merge({ error: true, loading: false }),
  [Types.SAVE_NEW_MEETUP_REQUEST]: state => state.merge({ loading: true }),
  [Types.SAVE_NEW_MEETUP_SUCCESS]: state =>
    state.merge({ loading: false, error: false }),
  [Types.SAVE_NEW_MEETUP_FAILURE]: state =>
    state.merge({ error: true, loading: false }),
  [Types.SEARCH_MEETUPS_REQUEST]: state => state.merge({ loading: true }),
  [Types.SEARCH_MEETUPS_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false, error: false }),
  [Types.SEARCH_MEETUPS_FAILURE]: state =>
    state.merge({ error: true, loading: false }),
  [Types.REGISTER_IN_MEETUP_REQUEST]: state => state.merge({ loading: true }),
  [Types.REGISTER_IN_MEETUP_SUCCESS]: state =>
    state.merge({ loading: false, error: false }),
  [Types.REGISTER_IN_MEETUP_FAILURE]: state =>
    state.merge({ error: true, loading: false })
});
