import { ACTIONS } from "../constants";

export default {
  loadProfile: (profile) => ({
    type: ACTIONS.AUTH.LOAD_PROFILE,
    payload: profile,
  }),
  setProfilePhoto: (photoURL) => ({
    type: ACTIONS.AUTH.SET_PROFILE_PHOTO,
    payload: photoURL,
  }),
  setTcTokenV3: (tokenV3) => ({
    type: ACTIONS.AUTH.SET_TOKEN_V3,
    payload: tokenV3,
  }),
  setTcTokenV2: (tokenV2) => ({
    type: ACTIONS.AUTH.SET_TOKEN_V2,
    payload: tokenV2,
  }),
  setInitialized: () => ({ type: ACTIONS.AUTH.SET_INITIALIZED }),
};
