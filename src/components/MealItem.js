import { Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import useFoodStorage from "../hooks/useFoodStorage";

const MealItem = ({
  calories,
  name,
  portion,
  isAbleToAdd,
  itemPosition,
  onCompleteAddRemove,
}) => {
  const { onSaveTodayFood, onDeleteTodayFood } = useFoodStorage();

  const handleIconPress = async () => {
    try {
      if (isAbleToAdd) {
        await onSaveTodayFood({ calories, name, portion });
        Alert.alert("Comida agregada al día");
      } else {
        await onDeleteTodayFood(itemPosition);
        onCompleteAddRemove?.();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Comida no agregada");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightConainer}>
        <TouchableOpacity style={styles.button} onPress={handleIconPress}>
          <Icon name={isAbleToAdd ? "add-circle-outline" : "close"} />
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
