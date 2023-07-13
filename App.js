// import { StatusBar } from "expo-status-bar"; // <StatusBar style="auto" />
// import { Text } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

// import navSelector from "./routing";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

export default function App() {
  // const routes = navSelector(false);

  const [fontsLoaded] = useFonts({
    "Roboto-100": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-300": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-400": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-500": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-700": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-900": require("./assets/fonts/Roboto-Black.ttf"),
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <Provider store={store}>
      {/* <NavigationContainer>{routes}</NavigationContainer> */}
      <Main />
    </Provider>
  );
}

// npx expo start
// Добрий день, іконки треба додавати з бібліотеки expo/vector-icons

// логотип с наличием комментов с цветом и заполнен 1
// сортировка постов там и там 1
// ограничение ширины окна для ввода 1
// санки через билд запилить
