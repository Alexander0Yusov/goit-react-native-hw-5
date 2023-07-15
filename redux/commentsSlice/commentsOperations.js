import {
  addDoc,
  collection,
  query,
  collectionGroup,
  getDoc,
  getDocs,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config";

export const getCommentsById = async (id_) => {
  // Query a reference to a subcollection
  const querySnapshot = await getDocs(
    collection(db, "posts", `${id_}`, "comments")
  );
  const arr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push({ id: doc.id, data: doc.data() });
    // console.log(doc.id, " => ", doc.data());
  });
  return arr;
};

export const postComment = async ({ id, myComment, photoURL, uid }) => {
  const docRef = await doc(db, "posts", id);
  const comment = await {
    number: Date.now(),
    date: new Date().toLocaleDateString("uk-UA"),
    time: new Date().toLocaleTimeString("uk-UA"),
    comment: myComment,
    photoURL,
    uid,
  };

  const commentRef = await addDoc(collection(docRef, "comments"), comment);

  const doc_ = await getDoc(commentRef);

  // console.log("comment ", doc_.id, "===", doc_.data());
  return { id: doc_.id, data: doc_.data() };
};
