import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default CardComment = ({ text, portrait, date, time }) => {
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

        <View style={styles.textWrap}>
          <Text style={styles.title}>{text}</Text>
          <Text style={styles.time}>{`${date}   ${time}`}</Text>
        </View>
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
  textWrap: {
    width: "85%",
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#E8E8E8",
    borderRadius: 12,
  },
  thumb: {
    width: 30,
    height: 30,
    marginRight: 12,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#E8E8E8",
    // borderWidth: 1,
    // borderColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 16,

    // borderWidth: 1,
    // borderColor: "yellow",
  },
  time: {
    fontSize: 12,
    backgroundColor: "#E8E8E8",
    alignSelf: "flex-end",
    // borderWidth: 1,
    // borderColor: "yellow",
  },
});
