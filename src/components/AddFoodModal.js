import { Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import useFoodStorage from "../hooks/useFoodStorage";

const AddFoodModal = ({ onClose, visible }) => {
  const [calories, setCalories] = useState("");
  const [name, setName] = useState("");
  const [portion, setPortion] = useState("");

  const { onSaveFood } = useFoodStorage();

  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });

      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => onClose()}>
              <Icon name="close" size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={calories}
                onChangeText={(text) => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={{ fontWeight: "500" }}>KCAL</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={{ fontWeight: "500" }}>Nombre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={portion}
                onChangeText={(text) => setPortion(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={{ fontWeight: "500" }}>Porción</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#4ecb71",
                borderRadius: 5,
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
              }}
              onPress={handleAddPress}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
            >
              <Icon name="add" color="#fff" size={16} />
              <Text style={{ color: "#fff", fontSize: 16 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  legendContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 2,
  },
  input: {
    borderBottomWidth: 1,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});

export default AddFoodModal;
