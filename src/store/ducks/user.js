import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/**
 * Types & Action Creators
 */
const { Types, Creators } = createActions({
  loadUserRequest: ["id"],
  loadUserSuccess: ["user"],
  loadUserFailure: null,
  updateUserRequest: ["id", "fieldsToUpdate"],
  updateUserSuccess: ["user"],
  updateUserFailure: null
});

export const UserTypes = Types;
export default Creators;

/**
 * Initial State
 */
export const INITIAL_STATE = Immutable({
  data: null,
  error: false,
  loading: false
});

/**
 * Reducers
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_USER_REQUEST]: state => state.merge({ loading: true }),
  [Types.LOAD_USER_SUCCESS]: (state, { user }) =>
    state.merge({ data: user, loading: false }),
  [Types.LOAD_USER_FAILURE]: state =>
    state.merge({ error: true, loading: false }),
  [Types.UPDATE_USER_REQUEST]: state => state.merge({ loading: true }),
  [Types.UPDATE_USER_SUCCESS]: (state, { user }) =>
    state.merge({ data: user, loading: false }),
  [Types.UPDATE_USER_FAILURE]: state =>
    state.merge({ error: true, loading: false })
});
