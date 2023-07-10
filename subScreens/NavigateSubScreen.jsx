import { createStackNavigator } from "@react-navigation/stack";
import CommentsSubScreen from "./CommentsSubScreen";
import MapSubScreen from "./MapSubScreen";
import PostsSubScreen from "./PostsSubScreen";

const StackPostsSubScreens = createStackNavigator();

export default NavigateSubScreen = () => {
  return (
    <StackPostsSubScreens.Navigator>
      <StackPostsSubScreens.Screen
        options={{ headerShown: false }}
        name="basePostsSubScreen"
        component={PostsSubScreen}
      />
      <StackPostsSubScreens.Screen
        options={{ title: "Повернутися", headerTintColor: "#212121" }}
        // options={{ headerShown: false }}
        name="commentsPostsSubScreen"
        component={CommentsSubScreen}
      />
      <StackPostsSubScreens.Screen
        options={{ title: "Повернутися", headerTintColor: "#212121" }}
        // options={{ headerShown: false }}
        name="mapPostsSubScreen"
        component={MapSubScreen}
      />
    </StackPostsSubScreens.Navigator>
  );
};
