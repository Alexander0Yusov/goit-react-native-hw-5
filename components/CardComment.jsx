import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default CardComment = ({ text, portrait }) => {
  return (
    <View style={styles.wrap}>
      <>
        <View style={styles.thumb}>
          {portrait && (
            <Image
              style={styles.image}
              source={{
                uri: portrait,
              }}
            />
          )}
        </View>

        <Text style={styles.title}>{text}</Text>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    paddingLeft: 12,

    // borderWidth: 1,
    // borderColor: "blue",
  },
  thumb: {
    width: 30,
    height: 30,
    marginRight: 12,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "gray",
    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    width: "85%",
    fontSize: 16,
    paddingLeft: 12,
    backgroundColor: "#BDBDBD",
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
});
