import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../theme";

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority });
    setTitle("");
    setPriority("Medium");
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
    <Animatable.View animation="fadeInUp" duration={600} style={[styles.wrapper, theme.shadow]}>
      <TextInput
        style={[styles.input, theme.typography.body]}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
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

      <Animatable.View animation="bounceIn" duration={800}>
        <TouchableOpacity
          style={[styles.addBtn, theme.shadow]}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Ionicons
            name="add-circle"
            size={20}
            color={theme.colors.surface}
            style={styles.addIcon}
          />
          <Text style={[styles.addText, theme.typography.body]}>
            Add Task
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.small,
    alignItems: "center",
  },
  priorityText: {
    fontWeight: "600",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  addIcon: {
    marginRight: theme.spacing.xs,
  },
  addText: {
    color: theme.colors.surface,
    fontWeight: "600",
  },
});
