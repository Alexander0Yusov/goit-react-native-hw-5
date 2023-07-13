export const handlerPending = (state) => {
  state.isLoading = true;
};

export const handlerRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  alert(payload);
};

export const handlerFulfilledGet = (state, { payload }) => {
  const { data, countCommentsData } = payload;
  const arr = data;

  // console.log("looo ", arr.length, arr);
  // console.log("pooo ", countCommentsData.length, countCommentsData);

  const arrWithCounts = arr.map(({ id, data }) => {
    const { commentsCount } = countCommentsData.find(
      ({ id: id_ }) => id === id_
    );
    return { id, data, commentsCount };
  });

  state.isLoading = false;
  state.ownPosts = [...arrWithCounts].sort(
    ({ data: { number } }, { data: { number: number_ } }) => number_ - number
  );
  state.error = null;
};
