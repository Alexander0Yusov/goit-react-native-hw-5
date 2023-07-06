import { NavigationContainer } from "@react-navigation/native";
import navSelector from "../routing";

import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/stateSelectors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { useEffect, useState } from "react";
import { setUser } from "../redux/authService/authSlice";

export default function Main() {
  const { uid } = useSelector(authSelector);

  // const routes = navSelector(uid);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userUpd) => {
      if (userUpd) {
        console.log("uid== ", uid);
        // dispatch(setUser(userUpd));
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  const routes = navSelector(uid);

  return <NavigationContainer>{routes}</NavigationContainer>;
}
