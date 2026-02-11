import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useWorkouts } from "@/contexts/workout-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

export default function WorkoutsScreen() {
  const { workouts, addWorkout, deleteWorkout } = useWorkouts();
  const router = useRouter();
  const [showNewWorkoutInput, setShowNewWorkoutInput] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState("");

  const primaryColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const handleCreateWorkout = () => {
    if (newWorkoutName.trim()) {
      const workout = addWorkout(newWorkoutName.trim());
      setNewWorkoutName("");
      setShowNewWorkoutInput(false);
      router.push(`/workout/${workout.id}`);
    }
  };

  const handleDeleteWorkout = (id: string, name: string) => {
    Alert.alert(
      "Delete Workout",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteWorkout(id),
        },
      ],
    );
  };

  const renderWorkoutItem = ({ item }: { item: any }) => (
    <Pressable
      style={({ pressed }) => [
        styles.workoutCard,
        { backgroundColor: backgroundColor, opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={() => router.push(`/workout/${item.id}`)}
    >
      <View style={styles.workoutInfo}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText style={styles.exerciseCount}>
          {item.exercises.length} exercise
          {item.exercises.length !== 1 ? "s" : ""}
        </ThemedText>
        <ThemedText style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString()}
        </ThemedText>
      </View>
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteWorkout(item.id, item.name)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </Pressable>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">My Workouts</ThemedText>
        <Pressable
          style={[styles.addButton, { backgroundColor: primaryColor }]}
          onPress={() => setShowNewWorkoutInput(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </View>

      {showNewWorkoutInput && (
        <View
          style={[styles.newWorkoutContainer, { borderColor: primaryColor }]}
        >
          <TextInput
            style={[
              styles.input,
              { color: textColor, borderColor: primaryColor },
            ]}
            placeholder="Workout name"
            placeholderTextColor={textColor + "80"}
            value={newWorkoutName}
            onChangeText={setNewWorkoutName}
            autoFocus
            onSubmitEditing={handleCreateWorkout}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.cancelButton, { borderColor: primaryColor }]}
              onPress={() => {
                setShowNewWorkoutInput(false);
                setNewWorkoutName("");
              }}
            >
              <ThemedText>Cancel</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.createButton, { backgroundColor: primaryColor }]}
              onPress={handleCreateWorkout}
            >
              <ThemedText style={styles.createButtonText}>Create</ThemedText>
            </Pressable>
          </View>
        </View>
      )}

      {workouts.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="barbell-outline" size={64} color={textColor + "40"} />
          <ThemedText style={styles.emptyText}>No workouts yet</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Tap the + button to create your first workout
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  newWorkoutContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 20,
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
  listContent: {
    gap: 12,
  },
  workoutCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutInfo: {
    flex: 1,
  },
  exerciseCount: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
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
