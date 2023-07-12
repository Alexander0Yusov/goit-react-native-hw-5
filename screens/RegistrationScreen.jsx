import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { pickFile } from "../redux/authService/authOperations";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../redux/authService/thunks";

const SignupSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter Your login, please!"),
  mail: Yup.string()
    .email("Invalid email")
    .required("Enter Your email, please!"),
  password: Yup.string()
    .min(6)
    .required("Enter Your password, please!")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/,
      "Min: 6 symbols, one uppercase letter, one lowercase letter, one number, one special symbol"
    ),
});

export default RegistrationScreen = () => {
  const [isLoginFocus, setIsLoginFocus] = useState(false);
  const [isMailFocus, setIsMailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);
  const [portrait, setPortrait] = useState("");

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const PasswordShowHandler = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const toLoginPage = () => {
    console.log("goLoginPage");
    navigation.navigate("login");
  };

  const addPortret = async () => {
    if (portrait) {
      setPortrait("");
      return;
    }
    const filePath = await pickFile();
    setPortrait(filePath);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={{ borderWidth: 3, borderColor: "red" }}
        onPress={() => {
          Keyboard.dismiss();
          setIsFormActive(false);
        }}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/images/Photo-BG.jpg")}
        >
          <Formik
            initialValues={{ login: "", mail: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const { login, mail, password } = values;
              console.log(JSON.stringify(values));

              dispatch(signUpThunk({ email: mail, password, login, portrait }));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldTouched,
              isValid,
              handleSubmit,
            }) => (
              <TouchableWithoutFeedback
                style={{ borderWidth: 1, borderColor: "red" }}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsFormActive(false);
                }}
              >
                <View style={[styles.form, isFormActive && { height: 380 }]}>
                  <View style={styles.imageThumb}>
                    {portrait && (
                      <Image
                        style={styles.image}
                        source={{
                          uri: portrait,
                        }}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.buttonAddPortrait}
                      activeOpacity={0.8}
                      onPress={addPortret}
                    >
                      {!portrait ? (
                        <MaterialIcons
                          name="add-circle-outline"
                          size={28}
                          color="#FF6C00"
                        />
                      ) : (
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color="#212121"
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.title}>Реєстрація</Text>

                  <TextInput
                    style={[styles.input, isLoginFocus && styles.focusedInput]}
                    onFocus={() => {
                      setIsLoginFocus(true);
                      setIsFormActive(true);
                    }}
                    onBlur={() => {
                      setIsLoginFocus(false);
                      setFieldTouched("login");
                    }}
                    placeholder="Логін"
                    cursorColor={"black"}
                    paddingLeft={16}
                    value={values.login}
                    onChangeText={handleChange("login")}
                  />
                  {touched.login && errors.login && <Text>{errors.login}</Text>}

                  <TextInput
                    style={[styles.input, isMailFocus && styles.focusedInput]}
                    onFocus={() => {
                      setIsMailFocus(true);
                      setIsFormActive(true);
                    }}
                    onBlur={() => {
                      setIsMailFocus(false);
                      setFieldTouched("mail");
                    }}
                    placeholder="Електронна пошта"
                    cursorColor={"black"}
                    paddingLeft={16}
                    value={values.mail}
                    onChangeText={handleChange("mail")}
                    keyboardType="email-address"
                  />
                  {touched.mail && errors.mail && <Text>{errors.mail}</Text>}

                  <KeyboardAvoidingView
                    style={{ width: "100%" }}
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                  >
                    <View style={styles.wrapInputPass}>
                      <TextInput
                        style={[
                          styles.inputPass,
                          isPassFocus && styles.focusedInput,
                        ]}
                        onFocus={() => {
                          setIsPassFocus(true);
                          setIsFormActive(true);
                        }}
                        onBlur={() => {
                          setIsPassFocus(false);
                          setFieldTouched("password");
                        }}
                        placeholder="Пароль"
                        cursorColor={"black"}
                        paddingLeft={16}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        secureTextEntry={isPasswordShow ? false : true}
                      />
                      {touched.password && errors.password && (
                        <Text>{errors.password}</Text>
                      )}

                      <TouchableOpacity
                        style={styles.buttonShowPass}
                        activeOpacity={0.8}
                        onPress={PasswordShowHandler}
                      >
                        <Text style={styles.buttonSlaveText}>
                          {isPasswordShow ? "Сховати" : "Показати"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>

                  <TouchableOpacity
                    style={[
                      styles.buttonMaster,
                      { backgroundColor: isValid ? "#FF6C00" : "#FF6C0066" },
                    ]}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text style={styles.buttonMasterText}>Зареєструватися</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonSlave}
                    activeOpacity={0.8}
                    onPress={toLoginPage}
                  >
                    <Text style={styles.buttonSlaveText}>
                      Вже є акаунт? Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            )}
          </Formik>
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
  form: {
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
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
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
