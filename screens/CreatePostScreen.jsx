import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { HeaderBackButton } from "@react-navigation/elements";

export default CreatePostScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [namePhoto, setNamePhoto] = useState("");
  const [namePlace, setNamePlace] = useState("");
  const [inputIsActive, setInputIsActive] = useState(false);

  useEffect(() => {
    resetForm();
    setInputIsActive(false);
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      // строку ниже вроде надо бы убрать
      await Location.isBackgroundLocationAvailableAsync(true);
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  });

  const makeSnap = async () => {
    if (photo) {
      setPhoto("");
      return;
    }

    const snap = await cameraRef.takePictureAsync();
    const point = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = point.coords;
    setPhoto(snap.uri);
    setLocation({ latitude, longitude });
  };

  const resetForm = () => {
    setPhoto("");
    setNamePhoto("");
    setNamePlace("");
  };

  const handleSubmit = () => {
    const formData = { photo, namePhoto, namePlace, location };
    setInputIsActive(false);
    navigation.navigate("basePostsSubScreen", formData);
    resetForm();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setInputIsActive(false);
      }}
    >
      <View style={styles.container}>
        {!inputIsActive && (
          <View style={styles.thumb}>
            <Camera style={styles.camera} ref={setCameraRef}>
              {photo && <Image source={{ uri: photo }} style={styles.image} />}
              <TouchableOpacity style={styles.photoButton} onPress={makeSnap}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          </View>
        )}

        {!inputIsActive && (
          <Text style={styles.title}>
            {!photo ? "Завантажте фото" : ' "Зробити знімок" - видалити фото'}
          </Text>
        )}

        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={styles.inputNamePhoto}
            placeholder="Назва..."
            cursorColor={"black"}
            paddingLeft={16}
            value={namePhoto}
            onChangeText={setNamePhoto}
            onFocus={() => {
              setInputIsActive(true);
            }}
            // onBlur={() => {
            //   setInputIsActive(false);
            // }}
          />
          <TextInput
            style={styles.inputNamePlace}
            placeholder="Місцевість..."
            cursorColor={"black"}
            paddingLeft={16}
            value={namePlace}
            onChangeText={setNamePlace}
            onFocus={() => {
              setInputIsActive(true);
            }}
            // onBlur={() => {
            //   setInputIsActive(false);
            // }}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          style={[
            styles.buttonMaster,
            {
              backgroundColor:
                photo && namePhoto && namePlace ? "#FF6C00" : "#FF6C0066",
            },
          ]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={!(photo && namePhoto && namePlace)}
        >
          <Text style={styles.buttonMasterText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 32,
    paddingLeft: 12,
    paddingRight: 12,

    // borderWidth: 1,
    // borderColor: "red",
  },
  thumb: {
    height: 300,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#E8E8E8",

    borderWidth: 1,
    borderColor: "red",
  },
  camera: {
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  photoButton: {
    position: "absolute",
    bottom: 32,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff66",
    alignItems: "center",
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#BDBDBD",
    fontFamily: "Roboto-400",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  inputNamePhoto: {
    marginTop: 30,
    height: 50,
    width: "100%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  inputNamePlace: {
    marginTop: 30,
    height: 50,
    width: "100%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  buttonMaster: {
    marginTop: 44,
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
});
