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
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/stateSelectors";
import { loginThunk } from "../redux/authService/thunks";

const SignupSchema = Yup.object().shape({
  mail: Yup.string()
    .email("Invalid email")
    .required("Enter Your email, please!"),
  password: Yup.string()
    .min(4)
    .required("Enter Your password, please!")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/,
      "Min: 4 symbols, one uppercase letter, one lowercase letter, one number, one special symbol"
    ),
});

export default LoginScreen = () => {
  const [isMailFocus, setIsMailFocus] = useState(false);
  const [isPassFocus, setIsPassFocus] = useState(false);

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(authSelector);

  useEffect(() => {
    console.log("logScreen== ", state.email);
  }, [state.email]);

  const navigation = useNavigation();

  const PasswordShowHandler = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const toSignUpPage = () => {
    console.log("goSignUpPage");
    navigation.navigate("register");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
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
            initialValues={{ mail: "masjuk@gmail.com", password: "aA2@aa" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const { login, mail, password } = values;
              // console.log(JSON.stringify(values));
              dispatch(loginThunk({ email: mail, password }));
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
                onPress={() => {
                  Keyboard.dismiss();
                  setIsFormActive(false);
                }}
              >
                <View style={[styles.form, isFormActive && { height: 270 }]}>
                  <Text style={styles.title}>Увійти</Text>

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
                    <Text style={styles.buttonMasterText}>Увійти</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonSlave}
                    activeOpacity={0.8}
                    onPress={toSignUpPage}
                  >
                    <Text style={styles.buttonSlaveText}>
                      Немає акаунту?
                      <Text style={{ textDecorationLine: "underline" }}>
                        {" "}
                        Зареєструватися
                      </Text>
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
    height: 460,
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

  title: {
    marginTop: 30,
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
    marginTop: 56,
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
