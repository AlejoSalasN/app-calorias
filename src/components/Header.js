import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Icon } from "@rneui/themed";

const staticInfo = {
  name: "Alejandro Salas",
  uri: "https://i.pinimg.com/736x/cc/43/2c/cc432c6e99ec675baf1d920fa7212d5c.jpg",
};

const Header = () => {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() && Platform.OS === "ios" ? (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "#808080",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  arrowContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginLeft: -12,
  },
});

export default Header;
