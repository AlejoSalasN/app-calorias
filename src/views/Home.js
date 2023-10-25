import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { Icon } from "@rneui/themed";

const Home = () => {
  const { navigate } = useNavigation();
  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddCaloriesPress()}
          >
            <Icon name="add-circle-outline" color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#4ecb71",
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesLegend: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
