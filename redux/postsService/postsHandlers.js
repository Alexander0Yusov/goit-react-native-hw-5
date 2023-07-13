import { collection, getDocs } from "firebase/firestore";

export const handlerPending = (state) => {
  state.isLoading = true;
};

export const handlerRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
  alert(payload);
};

export const handlerFulfilledGet = (state, { payload }) => {
  const arr = [];

  const { data, countCommentsData } = payload;
  data.forEach((doc) => {
    arr.push({ id: doc.id, data: doc.data() });
    // console.log(`${doc.id} =>`, doc.data());
  });

  const arrWithCounts = arr
    .map(({ id, data }) => {
      const { commentsCount } = countCommentsData.find(
        ({ id: id_ }) => id === id_
      );
      return { id, data, commentsCount };
    })
    .sort(
      ({ data: { number } }, { data: { number: number_ } }) => number_ - number
    );

  state.isLoading = false;
  state.posts = arrWithCounts;
  state.error = null;
};

export const handlerFulfilledPost = (state, { payload }) => {
  state.isLoading = false;
  // console.log("payload post  ", payload);
  // state.posts = payload;
  state.error = null;
};

export const handlerFulfilledPatch = (state, { payload }) => {
  state.isLoading = false;
  console.log(payload);
  state.contacts = state.contacts
    .filter(({ id }) => id !== payload.data.id)
    .concat([payload.data]);
  state.error = null;
};

export const handlerFulfilledDelete = (state, { payload }) => {
  state.isLoading = false;
  state.contacts = state.contacts.filter(({ id }) => id !== payload.data.id);
  state.error = null;
};
