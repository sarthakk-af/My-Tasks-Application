import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const getPriorityStyle = () => {
    const colors = {
      High: theme.colors.error,
      Medium: theme.colors.accent,
      Low: theme.colors.secondary,
    };
    return { backgroundColor: colors[task.priority] || theme.colors.textSecondary };
  };

  return (
    <Animatable.View animation="fadeInUp" duration={500} style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => onToggle(task._id)}
        style={[
          styles.container,
          theme.shadow,
          task.completed && styles.completedTask,
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.textSection}>
          <Text
            style={[
              styles.title,
              theme.typography.body,
              task.completed && styles.completedText,
            ]}
          >
            {task.title}
          </Text>
          <View style={[styles.badge, getPriorityStyle()]}>
            <Text style={[styles.badgeText, theme.typography.body]}>
              {task.priority}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionBtn}>
            <Ionicons name="pencil" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(task._id)} style={styles.actionBtn}>
            <Ionicons name="trash" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
  },
  completedTask: {
    backgroundColor: theme.colors.background,
    opacity: 0.8,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.colors.textSecondary,
  },
  badge: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  actionBtn: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.small,
    backgroundColor: theme.colors.background,
  },
});
