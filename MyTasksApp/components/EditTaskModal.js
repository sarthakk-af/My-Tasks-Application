import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function EditTaskModal({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave({ ...task, title: title.trim(), priority });
  };

  const getPriorityStyle = (level) => {
    const colors = {
      High: theme.colors.error,
      Medium: theme.colors.accent,
      Low: theme.colors.secondary,
    };
    return priority === level ? { backgroundColor: colors[level] } : {};
  };

  return (
    <Modal transparent animationType="fade" visible onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Animatable.View animation="zoomIn" duration={300} style={[styles.modal, theme.shadow]}>
          <Text style={[styles.heading, theme.typography.title]}>Edit Task</Text>

          <TextInput
            style={[styles.input, theme.typography.body]}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="sentences"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <View style={styles.priorityRow}>
            {["High", "Medium", "Low"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.priorityBtn,
                  theme.shadow,
                  getPriorityStyle(level),
                ]}
                onPress={() => setPriority(level)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.priorityText,
                    theme.typography.body,
                    priority === level && { color: theme.colors.surface },
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.cancelBtn, theme.shadow]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.icon}
              />
              <Text style={[styles.cancelText, theme.typography.body]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.saveBtn, theme.shadow]}
              activeOpacity={0.7}
            >
              <Ionicons
                name="checkmark"
                size={20}
                color={theme.colors.surface}
                style={styles.icon}
              />
              <Text style={[styles.saveText, theme.typography.body]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.lg,
  },
  heading: {
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  priorityBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.small,
  },
  priorityText: {
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.spacing.md,
  },
  cancelBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.small,
  },
  cancelText: {
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.small,
  },
  saveText: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
});
