import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const MealItem = ({ calories, name, portion }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightConainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name="add-circle-outline" />
        </TouchableOpacity>
        <Text style={styles.calories}>{calories} KCal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ade8af",
    marginBottom: 12,
    borderRadius: 15,
    padding: 12,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightConainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  portion: {
    fontSize: 13,
    color: "#808080",
    fontWeight: "500",
  },
  calories: {
    fontSize: 18,
  },
});

export default MealItem;
