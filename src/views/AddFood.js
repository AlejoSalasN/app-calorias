import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Icon } from "@rneui/themed";
import Header from "../components/Header";
import AddFoodModal from "../components/AddFoodModal";
import useFoodStorage from "../hooks/useFoodStorage";
import MealItem from "../components/MealItem";

const AddFood = () => {
  const [visible, setVisible] = useState(false);
  const [foods, setFoods] = useState([]);
  const { onGetFood } = useFoodStorage();
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFood();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Comida guardada exitosamente");
      loadFoods();
    }
    setVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFood();
      setFoods(
        result.filter((item) =>
          item.name.toLocalLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.buttonAddFood}
            onPress={() => setVisible(true)}
          >
            <Icon name="add-circle-outline" color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchLeftContainer}>
          <TextInput
            placeholder="apples, pie, soda..."
            style={styles.input}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonSearch}
          onPress={handleSearchPress}
        >
          <Text style={{ fontSize: 14 }}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {foods?.map((meal) => (
          <MealItem
            key={`my-meal-item-${meal.name}`}
            {...meal}
            isAbleToAdd={true}
          />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  addFoodContainer: {
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
  buttonAddFood: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#4ecb71",
    alignItems: "center",
    justifyContent: "center",
  },
  addFoodLegend: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  searchLeftContainer: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
  },
  buttonSearch: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#ade8af",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddFood;
