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

export const getOwnPosts = async (uid) => {
  // Firebase SDK версии 9 (Firebase Modular SDK)
  const citiesRef = collection(db, "posts");
  const q = query(citiesRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    arr.push({ id: doc.id, data: doc.data() });
  });
  return arr;
};

export const countCommentsEachPost = async () => {
  // Получение всех документов из коллекции "posts"
  const postsRef = collection(db, "posts");
  const postsSnapshot = await getDocs(postsRef);

  const ar = [];
  const ar2 = [];
  const ar3 = [];

  postsSnapshot.forEach((postDoc) => {
    const commentsRef = collection(postDoc.ref, "comments");
    ar.push(commentsRef);
    ar3.push(postDoc.id);
  });

  const proms = [];
  let res = null;

  try {
    for (let index = 0; index < ar.length; index++) {
      proms.push(getDocs(ar[index]));
    }
    res = await Promise.all(proms);
  } catch (error) {
    console.error("Ошибка выполнения промисов:", error);
  }

  for (let index = 0; index < ar.length; index++) {
    ar2.push({
      id: ar3[index],
      commentsCount: res[index].size,
    });
  }

  return ar2;
};
