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

export const getPosts = async () => {
  return await getDocs(collection(db, "posts"));
};

export const postPost = async (item) => {
  return await addDoc(collection(db, "posts"), item);
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
