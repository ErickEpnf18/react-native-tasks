import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("TaskFormScreen", {idUp: task.id})}>
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.itemDescription}>{task.description}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(task.id)}
        style={styles.buttonDelete}
      >
        <Text style={styles.itemTitle}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: "#fff",
  },
  itemDescription: {
    color: "#fff",
  },
  buttonDelete: {
    backgroundColor: "#ee5253",
    padding: 7,
    borderRadius: 5,
  },
});

export default TaskItem;
