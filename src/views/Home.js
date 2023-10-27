import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TodayCalories from "../components/TodayCalories";
import TodayMeals from "../components/TodayMeals";
import Header from "../components/Header";
import { Icon } from "@rneui/themed";
import useFoodStorage from "../hooks/useFoodStorage";

const TotalCaloriesPerDay = 2000;

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);
  const [todayStatistics, setTodayStatistics] = useState({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: TotalCaloriesPerDay,
  });
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } = useNavigation();

  const calculateTodayStatistics = (meals) => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, current) => acum + Number(current.calories),
        0
      );
      const remainingCalories = TotalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / TotalCaloriesPerDay) * 100;

      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const todayFoodResponse = await onGetTodayFood();
      if (todayFoodResponse !== null) {
        calculateTodayStatistics(todayFoodResponse);
        setTodayFood(todayFoodResponse);
      }
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [])
  );

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
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={todayFood}
        onCompleteAddRemove={() => loadTodayFood()}
      />
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
