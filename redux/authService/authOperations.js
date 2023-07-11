import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth, storage } from "../../config";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import shortid from "shortid";

export const pickFile = async () => {
  // выбор файла
  try {
    const res = await DocumentPicker.getDocumentAsync();
    console.log(res.uri);
    return res.uri;
  } catch (err) {
    console.log("Ошибка выбора файла: " + err);
  }
  return res;
};

export const getFileRef = async (photo, key, path) => {
  // запись и чтение базы
  const response = await fetch(photo);
  const file = await response.blob();
  const storageRef = ref(storage, `${path}/${key}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    // console.log("Uploaded a blob or file! == ", snapshot);
  } catch (error) {
    console.log(error);
  }
  // Create a reference from a Google Cloud Storage URI
  const gsReference = ref(
    storage,
    `gs://postsaboutphotos.appspot.com/${path}/${key}`
  );
  const res = await getDownloadURL(gsReference);
  // console.log("reference from a Google Cloud Storage URI == ", res);
  return res;
};

export const registerDB = async ({ email, password, login, portrait }) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const user = await auth.currentUser;
  if (portrait) {
    const photoURL = await getFileRef(portrait, user.uid, "portraits");

    await updateProfile(user, { displayName: login, photoURL });
  } else {
    await updateProfile(user, { displayName: login });
  }
  return user;

  // return user;
  // data {"_tokenResponse": {"email": "gg@gmail.com", "expiresIn": "3600",
  //"idToken": "jkz4...", "kind": "identitytoolkit#SignupNewUserResponse",
  // "localId": "j12MmxK3bjNa5CkxV7q8afAGaeU2", "refreshToken": "AP..."},
  //"operationType": "signIn", "providerId": null, "user": {"_redirectEventId": undefined, "apiKey":
  //"AIzaSyD2PVo-3pTn8yEnQA6ARvqyWJCU7BU7Ubc", "appName": "[DEFAULT]", "createdAt": "1688596555303",
  //"displayName": undefined, "email": "gg@gmail.com", "emailVerified": false, "isAnonymous": false,
  //"lastLoginAt": "1688596555303", "phoneNumber": undefined, "photoURL": undefined, "providerData": [Array],
  //"stsTokenManager": [Object], "tenantId": undefined, "uid": "j12MmxK3bjNa5CkxV7q8afAGaeU2"}}
};

export const updatePortrait = async (newPortrait) => {
  const user = await auth.currentUser;
  if (newPortrait) {
    const key = shortid.generate();
    const photoURL = await getFileRef(newPortrait, key, "portraits");
    await updateProfile(user, { photoURL });
  } else {
    await updateProfile(user, { photoURL: "" });
  }
  return user;
};

// туфта - ф топку
const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
};

const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  // якщо такий користувач знайдений
  if (user) {
    // оновлюємо його профайл
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const signOut_ = async () => {
  await signOut(auth);
  console.log("signOut operation");
};
