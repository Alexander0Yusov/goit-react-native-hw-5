import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import CardComment from "../components/CardComment";
import CardOwnComment from "../components/CardOwnComment";
import { useState } from "react";
import { addDoc, collection, doc, set, add } from "firebase/firestore";
import { db } from "../config";

export default CommentsSubScreen = ({ route }) => {
  const [myComment, setMyComment] = useState("");
  const { id } = route.params;

  const onSendComment = async () => {
    try {
      // const docRef = await addDoc(collection(db, `posts.${id}.comments`), {
      //   myComment,
      // });

      // firebase
      //   .firestore()
      //   .collection("users")
      //   .doc("userID")
      //   .collection("orders")
      //   .add({
      //     // Здесь вы можете указать данные для нового документа в коллекции 'orders'
      //     // Например, 'orderName': 'Название заказа', 'orderDate': 'Дата заказа' и т.д.
      //   });

      // const postDocRef = doc(db, "posts", id);
      console.log("hi");

      const docRef = await db
        .firestore()
        .collection("posts")
        .doc(`${id}`)
        .collection("comments")
        .add({
          myComment,
        });

      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const writeDataToFirestore = async (photoURI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photoURI,
        location,
        namePhoto,
        namePlace,
        uid,
        displayName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        // setIsFormActive(false);
      }}
    >
      <View style={styles.container}>
        {/* <Text style={styles.title}>Comments SubScreen</Text> */}
        {/* <FlatList
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
                toComments={toCommentsScreen}
              />
            );
          }
        }}
      ></FlatList> */}

        <View style={{ marginBottom: "auto" }}>
          <CardComment text="sometext" />
          <CardOwnComment text="sometext" />
          <CardComment text="sometext" />
        </View>

        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.wrapInputPass}>
            <TextInput
              style={[styles.inputPass, true && styles.focusedInput]}
              onFocus={() => {
                // setIsPassFocus(true);
                // setIsFormActive(true);
              }}
              onBlur={() => {
                // setIsPassFocus(false);
                // setFieldTouched("password");
              }}
              placeholder="Пароль"
              cursorColor={"black"}
              paddingLeft={16}
              value={myComment}
              onChangeText={setMyComment}
            />

            <TouchableOpacity
              style={styles.buttonShowPass}
              activeOpacity={0.8}
              onPress={onSendComment}
            >
              <Text style={styles.buttonSlaveText}>{"Відправити"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: "red",
  },

  title: {
    fontSize: 17,
    fontWeight: 500,
    fontFamily: "Roboto-500",
    color: "#212121",

    alignSelf: "center",

    // borderWidth: 1,
    // borderColor: "blue",
  },
  wrapInputPass: {
    position: "relative",
    width: "100%",
    height: 50,
    marginTop: 8,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "green",
  },
  inputPass: {
    height: 50,
    width: "100%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-400",
    color: "#212121",
  },
  buttonShowPass: {
    position: "absolute",
    right: 0,
    paddingRight: 16,
    height: 50,
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
});
