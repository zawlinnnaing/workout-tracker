import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useWorkouts } from "@/contexts/workout-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Exercise } from "@/types/workout";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    getWorkoutById,
    addExerciseToWorkout,
    deleteExercise,
    addSetToExercise,
    updateSet,
    deleteSet,
  } = useWorkouts();

  const workout = getWorkoutById(id!);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");

  const primaryColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  if (!workout) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Workout not found</ThemedText>
      </ThemedView>
    );
  }

  const handleAddExercise = () => {
    if (newExerciseName.trim()) {
      addExerciseToWorkout(workout.id, newExerciseName.trim());
      setNewExerciseName("");
      setShowAddExercise(false);
    }
  };

  const handleDeleteExercise = (exerciseId: string, exerciseName: string) => {
    Alert.alert(
      "Delete Exercise",
      `Are you sure you want to delete "${exerciseName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteExercise(workout.id, exerciseId),
        },
      ],
    );
  };

  const handleAddSet = (exerciseId: string) => {
    addSetToExercise(workout.id, exerciseId);
  };

  const handleDeleteSet = (exerciseId: string, setId: string) => {
    deleteSet(workout.id, exerciseId, setId);
  };

  const handleUpdateSet = (
    exerciseId: string,
    setId: string,
    field: "reps" | "weight",
    value: string,
  ) => {
    const numValue = value === "" ? undefined : parseInt(value, 10);
    if (value !== "" && (isNaN(numValue!) || numValue! < 0)) {
      return;
    }
    updateSet(workout.id, exerciseId, setId, {
      [field]: field === "reps" ? numValue || 0 : numValue,
    });
  };

  const renderExercise = (exercise: Exercise) => (
    <View
      key={exercise.id}
      style={[styles.exerciseCard, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.exerciseHeader}>
        <ThemedText type="subtitle">{exercise.name}</ThemedText>
        <Pressable
          onPress={() => handleDeleteExercise(exercise.id, exercise.name)}
        >
          <Ionicons name="trash-outline" size={20} color="red" />
        </Pressable>
      </View>

      {exercise.sets.length === 0 ? (
        <ThemedText style={styles.noSetsText}>No sets yet</ThemedText>
      ) : (
        <View style={styles.setsContainer}>
          <View style={styles.setHeaderRow}>
            <ThemedText style={styles.setHeaderText}>Set</ThemedText>
            <ThemedText style={styles.setHeaderText}>Reps</ThemedText>
            <ThemedText style={styles.setHeaderText}>Weight (kg)</ThemedText>
            <View style={styles.setHeaderAction} />
          </View>
          {exercise.sets.map((set, index) => (
            <View key={set.id} style={styles.setRow}>
              <ThemedText style={styles.setNumber}>{index + 1}</ThemedText>
              <TextInput
                style={[
                  styles.setInput,
                  { color: textColor, borderColor: primaryColor },
                ]}
                value={set.reps?.toString() || ""}
                onChangeText={(value) =>
                  handleUpdateSet(exercise.id, set.id, "reps", value)
                }
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={textColor + "60"}
              />
              <TextInput
                style={[
                  styles.setInput,
                  { color: textColor, borderColor: primaryColor },
                ]}
                value={set.weight?.toString() || ""}
                onChangeText={(value) =>
                  handleUpdateSet(exercise.id, set.id, "weight", value)
                }
                keyboardType="numeric"
                placeholder="Optional"
                placeholderTextColor={textColor + "60"}
              />
              <Pressable
                style={styles.deleteSetButton}
                onPress={() => handleDeleteSet(exercise.id, set.id)}
              >
                <Ionicons name="close-circle" size={20} color="red" />
              </Pressable>
            </View>
          ))}
        </View>
      )}

      <Pressable
        style={[styles.addSetButton, { borderColor: primaryColor }]}
        onPress={() => handleAddSet(exercise.id)}
      >
        <Ionicons name="add" size={20} color={primaryColor} />
        <ThemedText style={{ color: primaryColor }}>Add Set</ThemedText>
      </Pressable>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: workout.name,
          headerBackTitle: "Back",
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <ThemedText type="title">{workout.name}</ThemedText>
              <ThemedText style={styles.dateText}>
                Created: {new Date(workout.createdAt).toLocaleDateString()}
              </ThemedText>
            </View>
          </View>

          {showAddExercise && (
            <View
              style={[
                styles.addExerciseContainer,
                { borderColor: primaryColor },
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  { color: textColor, borderColor: primaryColor },
                ]}
                placeholder="Exercise name (e.g., Bench Press)"
                placeholderTextColor={textColor + "80"}
                value={newExerciseName}
                onChangeText={setNewExerciseName}
                autoFocus
                onSubmitEditing={handleAddExercise}
              />
              <View style={styles.buttonRow}>
                <Pressable
                  style={[styles.cancelButton, { borderColor: primaryColor }]}
                  onPress={() => {
                    setShowAddExercise(false);
                    setNewExerciseName("");
                  }}
                >
                  <ThemedText>Cancel</ThemedText>
                </Pressable>
                <Pressable
                  style={[
                    styles.createButton,
                    { backgroundColor: primaryColor },
                  ]}
                  onPress={handleAddExercise}
                >
                  <ThemedText style={styles.createButtonText}>Add</ThemedText>
                </Pressable>
              </View>
            </View>
          )}

          <Pressable
            style={[
              styles.addExerciseButton,
              { backgroundColor: primaryColor },
            ]}
            onPress={() => setShowAddExercise(true)}
          >
            <Ionicons name="add" size={20} color="white" />
            <ThemedText style={styles.addExerciseButtonText}>
              Add Exercise
            </ThemedText>
          </Pressable>

          {workout.exercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="fitness-outline"
                size={64}
                color={textColor + "40"}
              />
              <ThemedText style={styles.emptyText}>No exercises yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Add your first exercise to get started
              </ThemedText>
            </View>
          ) : (
            <View style={styles.exercisesContainer}>
              {workout.exercises.map(renderExercise)}
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  addExerciseButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  addExerciseButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  addExerciseContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  createButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontWeight: "600",
  },
  exercisesContainer: {
    gap: 16,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  noSetsText: {
    opacity: 0.6,
    marginBottom: 12,
  },
  setsContainer: {
    marginBottom: 12,
  },
  setHeaderRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  setHeaderText: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.7,
    flex: 1,
    textAlign: "center",
  },
  setHeaderAction: {
    width: 24,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  setNumber: {
    flex: 0.5,
    textAlign: "center",
    fontWeight: "600",
  },
  setInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderRadius: 6,
    textAlign: "center",
  },
  deleteSetButton: {
    width: 24,
    alignItems: "center",
  },
  addSetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  emptyState: {
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
});
