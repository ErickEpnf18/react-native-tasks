import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getTask, saveTask, updateTask } from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);
  const handleChange = (name, value) => setTask({ ...task, [name]: value });
  const handleSubmit = () => {
    try {
      if (!editing) {
        saveTask(task);
      } else {
        updateTask(route.params.idUp, task);
      }
    } catch (error) {
      console.error(error);
    }
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    if (route.params && route.params.idUp) {
      navigation.setOptions({ headerTitle: "Updating a Task" });
      (async () => {
        setEditing(true);
        const task = await getTask(route.params.idUp);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  return (
    <Layout>
      <TextInput
        placeholder="Write a Title"
        placeholderTextColor="#fff"
        style={styles.input}
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      <TextInput
        placeholder="Write a Description"
        style={styles.input}
        placeholderTextColor="#fff"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />
      {!editing ? (
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttonSave}
        >
          <Text style={styles.buttonText} disabled>
            Save Task
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttonUpdate}
        >
          <Text style={styles.buttonText} disabled>
            Update Task
          </Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 35,
    color: "#fff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;
