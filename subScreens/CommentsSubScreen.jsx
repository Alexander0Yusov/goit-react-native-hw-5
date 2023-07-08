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
import { useEffect, useState } from "react";
import { addDoc, collection, doc, set, add, getDocs } from "firebase/firestore";
import { db } from "../config";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/stateSelectors";

export default CommentsSubScreen = ({ route }) => {
  const [myComment, setMyComment] = useState("");
  const [comments, setComments] = useState([]);
  const { photoURL, uid } = useSelector(authSelector);
  const { id } = route.params;

  useEffect(() => {
    if (myComment === "") {
      getAllCommentsToPost();
      console.log("comments  ", comments);
    }
  }, [myComment]);

  const onSendComment = async () => {
    try {
      const docRef = await doc(db, "posts", id);
      const comment = {
        date: new Date().toLocaleDateString("uk-UA"),
        time: new Date().toLocaleTimeString("uk-UA"),
        comment: myComment,
        photoURL,
        uid,
      };

      await addDoc(collection(docRef, "comments"), comment);
      setMyComment("");
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const getAllCommentsToPost = async () => {
    // Query a reference to a subcollection
    const querySnapshot = await getDocs(
      collection(db, "posts", `${id}`, "comments")
    );
    const arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arr.push({ id: doc.id, data: doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    setComments(arr);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        // setIsFormActive(false);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Comments SubScreen MUST BE IMG</Text>
        {comments.length > 0 && (
          <FlatList
            data={comments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item: { data } }) => {
              const { comment, uid: uid_, photoURL } = data;
              if (uid_ !== uid) {
                return <CardComment text={`${comment}`} portrait={photoURL} />;
              }
              return <CardOwnComment text={`${comment}`} portrait={photoURL} />;
            }}
          ></FlatList>
        )}

        {/* <View style={{ marginBottom: "auto" }}>
          {comments.length > 0 && <CardComment text="sometext" />}
          <CardOwnComment text="sometext" />
          <CardComment text="sometext" />
        </View> */}

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
