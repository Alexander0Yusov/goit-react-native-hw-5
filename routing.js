import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import NavigateSubScreen from "./subScreens/NavigateSubScreen";

const StackAuth = createStackNavigator();
const ButtomTabNav = createBottomTabNavigator();

//===== 1
const optionsPostsSubScreen = {
  headerShown: false,
  title: "Публікації",
  headerTitleAlign: "center",
  headerShadowVisible: true,
  headerStyle: {
    elevation: 10,
    shadowOpacity: 4,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    fontSize: 17,
  },

  headerRight: () => {
    <TouchableOpacity
      style={{
        height: 24,
        width: 24,
        backgroundColor: "black",
      }}
      onPress={() => console.log("hi")}
    >
      <Ionicons name="exit-outline" size={20} color="#BDBDBD" />
    </TouchableOpacity>;
  },
  headerRightContainerStyle: {
    height: 28,
    width: 28,
    marginRight: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  tabBarHideOnKeyboard: true,
  tabBarIcon: ({ color }) => (
    <SimpleLineIcons name="grid" size={24} color={color} />
  ),
  tabBarShowLabel: true,
  tabBarLabel: ({ focused }) => (
    <View
      style={{
        height: 4,
        width: 120,
        backgroundColor: focused ? "#212121" : "transparent",
        marginBottom: 4,
      }}
    ></View>
  ),
  tabBarActiveTintColor: "#FF6C00",
  tabBarInactiveTintColor: "#BDBDBD",
  tabBarStyle: {
    height: 83,
  },
};

// ====== 2

const optionsCreatePostScreen = {
  headerShown: true,
  title: "Створити публікацію",
  headerTitleAlign: "center",
  headerShadowVisible: true,
  headerStyle: {
    elevation: 10,
    shadowOpacity: 4,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    fontSize: 17,
  },
  // headerLeft: (props) => {
  //   return (
  //     <AntDesign
  //       {...props}
  //       name="arrowleft"
  //       size={24}
  //       color="black"
  //       onPress={() => console.log(props)}
  //     />
  //   );
  // },

  // headerLeftContainerStyle: {
  //   height: 28,
  //   width: 28,
  //   marginLeft: 16,
  //   marginTop: 16,
  //   borderWidth: 1,
  //   borderColor: "red",
  // },
  tabBarHideOnKeyboard: true,
  tabBarIcon: ({ color }) => <Ionicons name="add" size={24} color={color} />,
  tabBarShowLabel: true,
  tabBarLabel: ({ focused }) => (
    <View
      style={{
        position: "absolute",
        top: 54,
        height: 4,
        width: 120,
        backgroundColor: focused ? "#212121" : "transparent",
        marginBottom: 4,
      }}
    ></View>
  ),
  tabBarItemStyle: {
    position: "relative",
    marginTop: 20,
    height: 40,
    width: 50,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  tabBarActiveTintColor: "#fff",
  tabBarInactiveTintColor: "#BDBDBD",
  tabBarStyle: {
    height: 83,
  },
};

// ======= 3

const optionsProfileScreen = {
  headerShown: false,
  tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
  tabBarShowLabel: true,
  tabBarLabel: ({ focused }) => (
    <View
      style={{
        height: 4,
        width: 120,
        backgroundColor: focused ? "#212121" : "transparent",
        marginBottom: 4,
      }}
    ></View>
  ),
  tabBarActiveTintColor: "#FF6C00",
  tabBarInactiveTintColor: "#BDBDBD",
  tabBarStyle: {
    height: 83,
  },
};

export default navSelector = (isAuth) => {
  if (isAuth) {
    return (
      <ButtomTabNav.Navigator initialRouteName="posts" backBehavior="history">
        <ButtomTabNav.Screen
          name="posts"
          component={NavigateSubScreen}
          options={optionsPostsSubScreen}
        />
        <ButtomTabNav.Screen
          name="createPost"
          component={CreatePostScreen}
          options={optionsCreatePostScreen}
        />
        <ButtomTabNav.Screen
          name="profile"
          component={ProfileScreen}
          options={optionsProfileScreen}
        />
      </ButtomTabNav.Navigator>
    );
  }

  return (
    <StackAuth.Navigator>
      <StackAuth.Screen
        options={{ headerShown: false }}
        name="login"
        component={LoginScreen}
      />
      <StackAuth.Screen
        options={{ headerShown: false }}
        name="register"
        component={RegistrationScreen}
      />
    </StackAuth.Navigator>
  );
};
