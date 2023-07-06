import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOutThunk } from "../redux/authService/thunks";
import { authSelector } from "../redux/stateSelectors";

export default ProfileScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector(authSelector);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/images/Photo-BG.jpg")}
        >
          <View style={[styles.profileContent]}>
            <View style={styles.imageThumb}>
              <TouchableOpacity
                style={styles.buttonAddPortrait}
                activeOpacity={0.8}
              >
                {false ? (
                  <MaterialIcons
                    name="add-circle-outline"
                    size={28}
                    color="#FF6C00"
                  />
                ) : (
                  <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonLogout}
              activeOpacity={0.8}
              onPress={() => dispatch(signOutThunk())}
            >
              <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
            </TouchableOpacity>

            <Text style={styles.title}>{state.displayName}</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    // borderWidth: 1,
    // borderColor: "red",
  },
  backgroundImage: {
    flex: 1,
    sizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  profileContent: {
    position: "relative",
    marginTop: "auto",
    height: 550,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,

    // borderWidth: 1,
    // borderColor: "red",
  },
  imageThumb: {
    position: "absolute",
    top: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonAddPortrait: {
    position: "absolute",
    right: -13,
    bottom: 13,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonLogout: {
    position: "absolute",
    top: 18,
    right: 16,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "blue",
  },
  imagePortrait: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 90,
    marginBottom: 15,
    fontSize: 30,
    fontFamily: "Roboto-500",
    color: "#212121",
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-400",
    color: "#212121",
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
  wrapInputPass: {
    position: "relative",
    width: "100%",
    height: 50,
    marginTop: 15,
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "red",
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
  buttonMaster: {
    marginTop: 40,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 25,
  },
  buttonMasterText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Roboto-400",
  },

  buttonSlave: {
    marginTop: 4,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonSlaveText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-400",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
});
