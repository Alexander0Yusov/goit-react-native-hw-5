import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default CardPost = ({
  photo,
  namePhoto,
  namePlace,
  toMap,
  toComments,
}) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.thumb}>
        <Image style={styles.image} source={{ uri: photo }} />
      </View>
      <Text style={styles.title}>{namePhoto}</Text>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttonComments}
          activeOpacity={0.8}
          onPress={toComments}
        >
          <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>{"25"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonMap}
          activeOpacity={0.8}
          onPress={toMap}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={styles.locationText}>{namePlace}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: 360,
    marginTop: 8,
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  thumb: {
    width: "100%",
    marginBottom: 4,
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
    fontSize: 16,
    marginBottom: 4,
    paddingLeft: 12,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
  containerButtons: {
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "green",
  },
  buttonComments: {
    flexDirection: "row",
    width: "20%",
    marginRight: "auto",
    justifyContent: "center",
  },
  buttonMap: {
    flexDirection: "row",
    width: "75%",
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "red",
  },
  locationText: {
    fontSize: 16,
    height: 22,
    marginLeft: 4,
    marginTop: 2,
    textDecorationLine: "underline",
    // borderWidth: 1,
    // borderColor: "tomato",
  },
});
