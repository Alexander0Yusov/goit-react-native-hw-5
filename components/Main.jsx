import { NavigationContainer } from "@react-navigation/native";
import navSelector from "../routing";

import { useSelector } from "react-redux";
import { authSelector, slaveSelector } from "../redux/stateSelectors";

export default function Main() {
  const { uid } = useSelector(authSelector);
  const { screenName } = useSelector(slaveSelector);

  const routes = navSelector(uid, screenName);

  return <NavigationContainer>{routes}</NavigationContainer>;
}
