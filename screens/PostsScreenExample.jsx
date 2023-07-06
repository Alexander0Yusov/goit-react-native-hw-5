import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>Публікації</Text>
          <TouchableOpacity style={styles.buttonLogout} activeOpacity={0.8}>
            <Ionicons name="exit-outline" size={28} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}></View>

      <View style={styles.footer}>
        <View style={styles.footerNavigation}>
          <TouchableOpacity style={styles.buttonGrid} activeOpacity={0.8}>
            <SimpleLineIcons name="grid" size={24} color="#212121" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.8}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonUser} activeOpacity={0.8}>
            <Feather name="user" size={24} color="#212121" />
          </TouchableOpacity>
        </View>
        <View style={styles.footerRow}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },
  header: {
    width: "100%",
    height: 88,

    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerWrap: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: 28,
    marginTop: 48,
    justifyContent: "center",

    // borderWidth: 1,
    // borderColor: "green",
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
  buttonLogout: {
    position: "absolute",
    right: 12,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "blue",
  },

  body: {
    width: "100%",
    flex: 1,
  },
  footer: {
    width: "100%",
    height: 83,

    alignItems: "center",
    marginTop: 16,

    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  footerNavigation: {
    height: 42,
    width: 208,
    marginTop: 16,

    flexDirection: "row",
    justifyContent: "space-between",

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonGrid: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  buttonAdd: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonUser: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  footerRow: {
    height: 5,
    width: 134,
    backgroundColor: "#212121",
    borderRadius: 2,
    marginTop: 12,
  },
});
