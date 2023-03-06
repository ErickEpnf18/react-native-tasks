import { FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { deleteTask, getTasks } from "../api";
import { useIsFocused } from "@react-navigation/native";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [refresing, setRefresing] = useState(false);

  const isFocused = useIsFocused();

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };
  useEffect(() => {
      loadTasks();
  }, [isFocused]);

    const handleDelete = async(id) => {
        await deleteTask(id)
        await loadTasks();
}
    
  const renderItem = ({ item: repo }) => {
      return <TaskItem task={repo} handleDelete={handleDelete} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefresing(true);
    await loadTasks();
    setRefresing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          colors={["#22ef3e"]}
          refreshing={refresing}
          onRefresh={onRefresh}
          progressBackgroundColor="#0a3d62"
        />
      }
    />
  );
};

export default TaskList;
