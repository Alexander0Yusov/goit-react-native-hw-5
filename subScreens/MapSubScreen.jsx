import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { setScreenName } from "../redux/slaveSlice/slaveSlice";

export default MapSubScreen = ({ route }) => {
  const {
    location: { latitude, longitude },
  } = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setScreenName(route.name));
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Map SubScreen</Text> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "red",
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
  map: {
    flex: 1,
  },
});
