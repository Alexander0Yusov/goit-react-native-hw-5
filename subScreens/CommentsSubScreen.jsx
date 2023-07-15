import {
  StyleSheet,
  View,
  Text,
  Image,
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
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSelector,
  commentsSelector,
  triggerSelector,
} from "../redux/stateSelectors";
import {
  getCommentsThunk,
  postCommentThunk,
} from "../redux/commentsSlice/commentsThunks";
import { setTrigger } from "../redux/triggerSlice/triggerSlice";
import shortid from "shortid";

export default CommentsSubScreen = ({ route, navigation }) => {
  const { id, postPicture } = route.params;
  const [myComment, setMyComment] = useState("");
  const [isFormActive, setIsFormActive] = useState(false);

  const dispatch = useDispatch();
  const { photoURL, uid } = useSelector(authSelector);
  const { comments } = useSelector(commentsSelector);
  const { trigger } = useSelector(triggerSelector);

  useEffect(() => {
    dispatch(getCommentsThunk(id));
    console.log("useEffect comments ");
  }, [trigger]);

  navigation.setOptions({
    tabBarVisible: false,
  });

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, []);

  const onSendComment = () => {
    if (!myComment) return;
    dispatch(postCommentThunk({ id, myComment, photoURL, uid }));
    setMyComment("");
    Keyboard.dismiss();
    // const key = shortid.generate();
    // dispatch(setTrigger(key));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFormActive(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.thumb}>
          <Image style={styles.image} source={{ uri: postPicture }} />
        </View>
        {comments && (
          <FlatList
            data={comments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item: { data } }) => {
              const { date, time, comment, uid: uid_, photoURL } = data;
              if (uid_ !== uid) {
                return (
                  <CardComment
                    date={date}
                    time={time}
                    text={comment}
                    portrait={photoURL}
                  />
                );
              }
              return (
                <CardOwnComment
                  date={date}
                  time={time}
                  text={comment}
                  portrait={photoURL}
                />
              );
            }}
          ></FlatList>
        )}

        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.wrapInput}>
            <TextInput
              style={[styles.input, isFormActive && styles.focusedInput]}
              onFocus={() => {
                setIsFormActive(true);
              }}
              onBlur={() => {
                setIsFormActive(false);
              }}
              placeholder="Ваш коментар"
              cursorColor={"black"}
              paddingLeft={16}
              value={myComment}
              onChangeText={setMyComment}
            />

            <TouchableOpacity
              style={styles.buttonSend}
              activeOpacity={0.8}
              onPress={onSendComment}
            >
              <Text
                style={[
                  styles.buttonSlaveText,
                  myComment && { color: "#FF6C00" },
                ]}
              >
                {false && "Відправити"}
                <Ionicons name="arrow-up-circle" size={34} />
              </Text>
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
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingLeft: 4,
    paddingRight: 4,
    // justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },

  thumb: {
    width: "100%",
    marginBottom: "auto",
    borderRadius: 8,
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: 260,
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
  wrapInput: {
    position: "relative",
    width: "100%",
    height: 50,
    marginTop: 8,
    marginBottom: 2,
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "green",
  },
  input: {
    height: 50,
    width: "100%",
    paddingRight: 80,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-400",
    color: "#212121",
  },
  buttonSend: {
    position: "absolute",
    right: 0,
    paddingRight: 12,
    height: 50,
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonSlaveText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-400",

    // borderWidth: 1,
    // borderColor: "red",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
});
