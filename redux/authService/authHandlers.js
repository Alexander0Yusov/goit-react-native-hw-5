// export const pendingHandler = state => {
//   state.isLoading = true;
// };

// export const rejectedHandler = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
//   console.log(payload);
// };

// export const loginFulfilledHandler = (state, { payload }) => {
//   state.token = payload.token;
//   state.isLoading = false;
//   state.error = null;
//   state.user = payload.user;
//   console.log(payload);
// };

// export const logoutFulfilledHandler = state => {
//   state.token = '';
//   state.isLoading = false;
//   state.error = null;
//   state.user = null;
// };

// export const getUserFulfilledHandler = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = null;
//   state.user = payload;
//   console.log('payload user ', payload);
// };

export const pendingHandler = (state) => {
  state.isLoading = true;
};

export const rejectedHandler = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  console.log("error handler==", payload);
};

export const loginFulfilledHandler = (state, { payload }) => {
  state.uid = payload.uid;
  state.displayName = payload.displayName;
  state.email = payload.email;
  state.photoURL = payload.photoURL;
  state.isLoading = false;
  state.error = null;
  console.log("login fulfilled handler == ", payload);
};

export const signOutFulfilledHandler = (state) => {
  state.uid = "";
  state.displayName = "";
  state.email = "";
  state.photoURL = "";
  state.isLoading = false;
  state.error = null;
  console.log("signOut Fulfilled Handler == ", state);
};

export const updateUserFulfilledHandler = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.photoURL = payload.photoURL;
  console.log("update User Fulfilled Handler == ", payload);
};
