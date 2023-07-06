// import { axiosInstance, pushToken, pullToken } from 'redux/axiosHerokuInstance';

// export const signUp = async user => {
//   const { data } = await axiosInstance.post('/users/signup', user);
//   pushToken(data.token);
//   return data;
// };

// export const login = async user => {
//   const { data } = await axiosInstance.post('/users/login', user);
//   pushToken(data.token);
//   return data;
// };

// export const logout = async () => {
//   const { data } = await axiosInstance.post('/users/logout');
//   pullToken();
//   return data;
// };

// export const getUser = async () => {
//   const { data } = await axiosInstance.get('/users/current');
//   return data;
// };

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../config";

// або більш короткий запис цієї функції
export const registerDB = async ({ email, password, login }) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const user = await auth.currentUser;
  await updateProfile(user, { displayName: login });

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

  console.log("signOut==");
};
