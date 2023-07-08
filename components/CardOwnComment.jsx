import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default CardOwnComment = ({ text, portrait }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{text}</Text>

      <View style={styles.thumb}>
        {portrait && (
          <Image
            style={styles.image}
            source={{
              uri: portrait,
              // uri: "https://firebasestorage.googleapis.com/v0/b/postsaboutphotos.appspot.com/o/sights%2F7hHOauPeq?alt=media&token=36a00425-66ec-4d98-a886-00688f257289",
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    paddingRight: 12,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  thumb: {
    width: 30,
    height: 30,
    marginLeft: 12,
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
    paddingRight: 12,
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
});
