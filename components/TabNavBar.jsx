import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default TabNavBar = ({ state, descriptors, navigation }) => {
  let gridFocused,
    addFocused,
    userFocused = false;
  const resetFocus = () => {
    gridFocused = addFocused = userFocused = false;
  };

  switch (state.index) {
    case 0: {
      resetFocus();
      gridFocused = true;

      break;
    }
    case 1: {
      resetFocus();
      addFocused = true;
      break;
    }
    case 2: {
      resetFocus();
      userFocused = true;
      break;
    }

    default:
      return;
  }

  const onPressGrid = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[0].key,
      canPreventDefault: true,
    });

    if (!gridFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: state.routes[0].name, merge: true });
    }
  };

  const onPressAdd = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[1].key,
      canPreventDefault: true,
    });

    if (!addFocused && !event.defaultPrevented) {
      navigation.navigate({ name: state.routes[1].name, merge: true });
    }
  };

  const onPressUser = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: state.routes[2].key,
      canPreventDefault: true,
    });

    if (!userFocused && !event.defaultPrevented) {
      navigation.navigate({ name: state.routes[2].name, merge: true });
    }
  };

  const onLongPressGrid = () => {
    navigation.emit({
      type: "tabLongPress",
      target: state.routes[0].key,
    });
  };

  const onLongPressAdd = () => {
    navigation.emit({
      type: "tabLongPress",
      target: state.routes[1].key,
    });
  };

  const onLongPressUser = () => {
    navigation.emit({
      type: "tabLongPress",
      target: state.routes[2].key,
    });
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerNavigation}>
        <TouchableOpacity
          style={styles.buttonGrid}
          activeOpacity={0.8}
          onPress={onPressGrid}
          onLongPress={onLongPressGrid}
        >
          <SimpleLineIcons
            name="grid"
            size={24}
            style={gridFocused ? { color: "#FF6C00" } : { color: "#212121" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonAdd,
            !addFocused && { backgroundColor: "#FF6C0066" },
          ]}
          activeOpacity={0.8}
          onPress={onPressAdd}
          onLongPress={onLongPressAdd}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonUser}
          activeOpacity={0.8}
          onPress={onPressUser}
          onLongPress={onLongPressUser}
        >
          <Feather
            name="user"
            size={24}
            color="#212121"
            style={userFocused ? { color: "#FF6C00" } : { color: "#212121" }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footerRow}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 83,

    alignItems: "center",
    // marginTop: 16,

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
