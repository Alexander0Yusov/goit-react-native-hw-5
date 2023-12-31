// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2PVo-3pTn8yEnQA6ARvqyWJCU7BU7Ubc",
  authDomain: "postsaboutphotos.firebaseapp.com",
  databaseURL: "https://postsaboutphotos.firebaseio.com",
  projectId: "postsaboutphotos",
  storageBucket: "postsaboutphotos.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
