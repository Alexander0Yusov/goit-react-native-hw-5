import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CardPost from "../components/CardPost";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOutThunk } from "../redux/authService/thunks";
import { postsSelector, triggerSelector } from "../redux/stateSelectors";
import { getPostsThunk } from "../redux/postsService/thunks";

export default PostsScreen = ({ navigation }) => {
  const { posts } = useSelector(postsSelector);
  const { trigger } = useSelector(triggerSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
    console.log("useEffect posts ", trigger);
  }, [trigger]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Публікації",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 17,
      },
      headerStyle: {
        elevation: 10,
        shadowOpacity: 4,
        borderBottomWidth: 1,
      },
      headerRight: () => (
        <Feather
          name="log-out"
          size={24}
          color="#BDBDBD"
          onPress={() => dispatch(signOutThunk())}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 20,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      {posts.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            if (item) {
              return (
                <CardPost
                  photo={item.data.photoURI}
                  namePhoto={item.data.namePhoto}
                  namePlace={item.data.namePlace}
                  commentsCount={item.commentsCount}
                  toMap={() => {
                    navigation.navigate("mapPostsSubScreen", {
                      location: item.data.location,
                    });
                  }}
                  toComments={() => {
                    navigation.navigate("commentsPostsSubScreen", {
                      id: item.id,
                      postPicture: item.data.photoURI,
                    });
                  }}
                />
              );
            }
          }}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },

  title: {
    fontSize: 17,
    fontWeight: 500,
    fontFamily: "Roboto-500",
    color: "#212121",
    marginBottom: 12,

    // alignSelf: "center",

    // borderWidth: 1,
    // borderColor: "blue",
  },
});
