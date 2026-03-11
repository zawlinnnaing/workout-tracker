import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useWorkoutLogs, useWorkouts } from '@/contexts/WorkoutContext';
import { Exercise, ExerciseLog, Workout, WorkoutLog } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

interface WorkoutLogViewProps {
  workout: Workout;
  log: WorkoutLog | undefined;
  onCompleteExercise: (workout: Workout, exerciseId: string) => void;
}

function ExerciseRow({
  exercise,
  exerciseLog,
  onComplete,
}: {
  exercise: Exercise;
  exerciseLog: ExerciseLog | undefined;
  onComplete: () => void;
}) {
  const isCompleted = !!exerciseLog?.completedAt;

  const setsLabel = [
    exercise.numberOfSets > 0 ? `${exercise.numberOfSets} sets` : null,
    exercise.reps > 0 ? `${exercise.reps} reps` : null,
    exercise.weight ? `${exercise.weight} kg` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card>
      <Pressable
        className="flex-row items-center"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        onPress={onComplete}
      >
        <Ionicons
          name={isCompleted ? 'checkbox' : 'square-outline'}
          size={26}
          color={isCompleted ? '#6C63FF' : '#9BA1A6'}
          style={{ marginRight: 12 }}
        />
        <View className="flex-1 gap-1">
          <Heading
            size="md"
            className={isCompleted ? 'line-through opacity-50' : ''}
          >
            {exercise.name}
          </Heading>
          {setsLabel ? (
            <Text className="text-[13px] opacity-60">{setsLabel}</Text>
          ) : null}
        </View>
      </Pressable>
    </Card>
  );
}

function WorkoutLogView({
  workout,
  log,
  onCompleteExercise,
}: WorkoutLogViewProps) {
  const completedCount = log
    ? log.exercises.filter((e) => !!e.completedAt).length
    : 0;
  const totalCount = workout.exercises.length;

  const getExerciseLog = (exerciseId: string): ExerciseLog | undefined =>
    log?.exercises.find((e) => e.exercise.id === exerciseId);

  return (
    <>
      <Stack.Screen
        options={{
          title: workout.name,
          headerBackTitle: 'Back',
        }}
      />
      <ThemedView className="flex-1">
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-sm font-semibold opacity-60">
              {completedCount} / {totalCount} exercises completed
            </Text>
          </View>

          {workout.exercises.length === 0 ? (
            <View className="mt-10 items-center gap-3">
              <Ionicons
                name="fitness-outline"
                size={64}
                color="#9BA1A6"
              />
              <Heading size="md">No exercises yet</Heading>
              <Text className="text-center text-sm opacity-70">
                Add exercises in the Workouts tab
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {workout.exercises.map((exercise) => (
                <ExerciseRow
                  key={exercise.id}
                  exercise={exercise}
                  exerciseLog={getExerciseLog(exercise.id)}
                  onComplete={() => onCompleteExercise(workout, exercise.id)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

function withWorkoutLog(Component: typeof WorkoutLogView) {
  return function WorkoutLogContainer() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getWorkoutById } = useWorkouts();
    const { getLog, completeExercise } = useWorkoutLogs();

    const workout = getWorkoutById(id!);

    if (!workout) {
      return (
        <ThemedView className="flex-1 items-center justify-center">
          <Text>Workout not found</Text>
        </ThemedView>
      );
    }

    const log = getLog(workout.id);

    return (
      <Component
        workout={workout}
        log={log}
        onCompleteExercise={completeExercise}
      />
    );
  };
}

export default withWorkoutLog(WorkoutLogView);
