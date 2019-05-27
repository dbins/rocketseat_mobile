import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
  signUpRequest: ["name", "email", "password"],
  signUpSuccess: ["email", "password", "firstTime"],
  signUpFailure: null
});

export const SignUpTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  error: false,
  loading: false
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: state => state.merge({ loading: true }),
  [Types.SIGN_UP_SUCCESS]: state => state.merge({ loading: false }),
  [Types.SIGN_UP_FAILURE]: state => state.merge({ error: true, loading: false })
});
