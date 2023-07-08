import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default CardComment = ({ text }) => {
  return (
    <View style={styles.wrap}>
      <>
        <View style={styles.thumb}>
          <Image
            style={styles.image}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/postsaboutphotos.appspot.com/o/sights%2F7hHOauPeq?alt=media&token=36a00425-66ec-4d98-a886-00688f257289",
            }}
          />
        </View>

        <Text style={styles.title}>
          {
            "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem."
          }
        </Text>
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
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: "yellow",
  },
});
