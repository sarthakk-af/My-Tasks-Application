import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import EditTaskModal from "./components/EditTaskModal";
import { theme } from "./theme";
import {
  fetchTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortByPriority, setSortByPriority] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const syncToStorage = async (taskList) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(taskList));
    } catch (err) {
      console.error("Storage error:", err.message);
    }
  };

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      if (data?.length) {
        setTasks(data);
        syncToStorage(data);
      } else {
        const local = await AsyncStorage.getItem("tasks");
        if (local) setTasks(JSON.parse(local));
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      console.warn("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ title, priority }) => {
    try {
      const newTask = await createTask({ title, priority });
      if (newTask) {
        const updated = [...tasks, newTask];
        setTasks(updated);
        syncToStorage(updated);
      }
    } catch {
      Alert.alert("Error", "Could not add task");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const updated = tasks.filter((t) => t._id !== id);
      setTasks(updated);
      syncToStorage(updated);
    } catch {
      Alert.alert("Error", "Could not delete task");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      const updated = tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      );
      setTasks(updated);
      syncToStorage(updated);
    } catch {
      Alert.alert("Error", "Could not toggle task");
    }
  };

  const handleEditSave = async (updatedTask) => {
    try {
      const res = await updateTask(updatedTask._id, updatedTask);
      if (res) {
        const updated = tasks.map((t) => (t._id === updatedTask._id ? res : t));
        setTasks(updated);
        syncToStorage(updated);
      }
    } catch {
      Alert.alert("Error", "Could not save changes");
    } finally {
      setEditingTask(null);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getPriorityWeight = (priority) =>
    priority === "High" ? 3 : priority === "Medium" ? 2 : 1;

  const filteredAndSortedTasks = tasks
    .filter((t) => filterPriority === "All" || t.priority === filterPriority)
    .sort((a, b) =>
      sortByPriority
        ? getPriorityWeight(b.priority) - getPriorityWeight(a.priority)
        : 0
    );

  const renderEmpty = () => (
    <View style={styles.emptyWrapper}>
      <Ionicons
        name="document-text-outline"
        size={48}
        color={theme.colors.textSecondary}
      />
      <Text style={[styles.emptyText, theme.typography.subtitle]}>
        No tasks yet. Add one above 👆
      </Text>
    </View>
  );

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonWrapper}>
      {[...Array(3)].map((_, i) => (
        <View key={i} style={[styles.skeletonItem, theme.shadow]}>
          <View style={styles.skeletonText} />
          <View style={styles.skeletonButton} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={[styles.title, theme.typography.title]}>📝 My Tasks</Text>
        <TaskInput onAdd={handleAdd} />

        <View style={styles.filterSortRow}>
          {["All", "High", "Medium", "Low"].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterButton,
                theme.shadow,
                filterPriority === level && styles.activeFilter,
              ]}
              onPress={() => setFilterPriority(level)}
            >
              <Text
                style={[
                  styles.filterText,
                  theme.typography.body,
                  filterPriority === level && { color: theme.colors.surface },
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.filterButton,
              theme.shadow,
              sortByPriority && styles.activeFilter,
            ]}
            onPress={() => setSortByPriority((prev) => !prev)}
          >
            <Ionicons
              name={sortByPriority ? "funnel" : "funnel-outline"}
              size={16}
              color={
                sortByPriority ? theme.colors.surface : theme.colors.textPrimary
              }
            />
            <Text
              style={[
                styles.filterText,
                theme.typography.body,
                sortByPriority && { color: theme.colors.surface },
              ]}
            >
              Sort
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          renderSkeletonLoader()
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <FlatList
              data={filteredAndSortedTasks}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TaskItem
                  task={item}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                  onEdit={setEditingTask}
                />
              )}
              ListEmptyComponent={renderEmpty}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[theme.colors.primary]}
                />
              }
              contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
            />
          </Animated.View>
        )}
      </View>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleEditSave}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  filterSortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
  },
  activeFilter: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontWeight: "500",
  },
  emptyWrapper: {
    marginTop: theme.spacing.xl,
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  emptyText: {
    textAlign: "center",
  },
  skeletonWrapper: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  skeletonItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonText: {
    width: "60%",
    height: 16,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
    borderRadius: theme.borderRadius.small,
  },
  skeletonButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
    borderRadius: theme.borderRadius.small,
  },
});
