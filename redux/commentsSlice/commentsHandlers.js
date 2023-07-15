export const commentsHandlerPending = (state) => {
  state.isLoading = true;
};

export const commentsHandlerRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  alert(payload);
};

export const commentsGetHandlerFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.comments = [...payload].sort(
    ({ data: { number } }, { data: { number: number_ } }) => number - number_
  );
  state.error = null;
};

export const commentPostHandlerFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.comments = [...state.comments, payload].sort(
    ({ data: { number } }, { data: { number: number_ } }) => number - number_
  );
};
