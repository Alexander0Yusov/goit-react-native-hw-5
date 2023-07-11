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
import { postsSelector } from "../redux/stateSelectors";
import { getPostsThunk } from "../redux/postsService/thunks";

export default PostsScreen = ({ navigation }) => {
  const { posts } = useSelector(postsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
    console.log("useEffect posts ");
  }, []);

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

  const toMapScreen = () => {
    navigation.navigate("mapPostsSubScreen");
  };

  const toCommentsScreen = () => {
    navigation.navigate("commentsPostsSubScreen");
  };

  return (
    <View style={styles.container}>
      {false && (
        // этот блок в топку
        <>
          <Text style={styles.title}>Posts Screen</Text>
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "red", marginBottom: 12 }}
            onPress={toMapScreen}
          >
            <Text style={{ fontSize: 24 }}>Go to Map screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: "red" }}
            onPress={toCommentsScreen}
          >
            <Text style={{ fontSize: 24 }}>Go to Comments screen</Text>
          </TouchableOpacity>
        </>
      )}
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
