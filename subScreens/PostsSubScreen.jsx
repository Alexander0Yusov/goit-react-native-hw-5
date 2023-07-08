import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CardPost from "../components/CardPost";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";

export default PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getDataFromFirestore();
    console.log("hi");
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
          onPress={() => console.log("Logout")}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 20,
      },
    });
  });

  const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const arr = [];

      snapshot.forEach((doc) => {
        arr.push({ id: doc.id, data: doc.data() });
        // console.log(`${doc.id} =>`, doc.data());
      });
      setPosts(arr);
      return arr;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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
                  toMap={() => {
                    navigation.navigate("mapPostsSubScreen", {
                      location: item.data.location,
                    });
                  }}
                  toComments={() => {
                    navigation.navigate("commentsPostsSubScreen", {
                      id: item.id,
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
