import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useWorkoutLogs, useWorkouts } from '@/contexts/WorkoutContext';
import { Workout, WorkoutLog } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeViewProps {
  workouts: Workout[];
  workoutLogs: Record<string, WorkoutLog>;
  onAddWorkout: () => void;
  onWorkoutPress: (id: string) => void;
  onWorkoutCheck: (workout: Workout) => void;
  onRestartRoutine: () => void;
}

function HomeView({
  workouts,
  workoutLogs,
  onAddWorkout,
  onWorkoutPress,
  onWorkoutCheck,
  onRestartRoutine,
}: HomeViewProps) {
  const hasWorkouts = workouts.length > 0;
  const hasAnyProgress = Object.values(workoutLogs).some(
    (log) => log.completedAt || log.exercises.some((e) => !!e.completedAt),
  );

  const renderWorkoutItem = ({ item }: { item: Workout }) => {
    const log = workoutLogs[item.id];
    const isCompleted = !!log?.completedAt;

    return (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        onPress={() => onWorkoutPress(item.id)}
      >
        <Card className="flex-row items-center rounded-xl p-4">
          <Pressable
            testID={`checkbox-${item.id}`}
            onPress={() => onWorkoutCheck(item)}
            className="mr-3"
            hitSlop={8}
          >
            <Ionicons
              name={isCompleted ? 'checkbox' : 'square-outline'}
              size={26}
              color={isCompleted ? '#6C63FF' : '#9BA1A6'}
            />
          </Pressable>
          <View className="flex-1 gap-1">
            <Heading
              size="lg"
              className={isCompleted ? 'line-through opacity-50' : ''}
            >
              {item.name}
            </Heading>
            <Text className="text-[13px] opacity-60">
              {item.exercises.length} exercise
              {item.exercises.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} className="text-muted" />
        </Card>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background-0 py-4">
      <ThemedView className="flex-1 px-4">
        <View className="mb-5 flex-row items-center justify-between">
          <Heading size="2xl">
            {hasWorkouts ? 'My Workouts' : 'Get Started'}
          </Heading>
          <View className="flex-row items-center gap-2">
            {hasAnyProgress && (
              <Pressable
                testID="restart-button"
                className="h-10 w-10 items-center justify-center rounded-full bg-background-100"
                onPress={onRestartRoutine}
              >
                <Ionicons name="refresh-outline" size={20} color="#6C63FF" />
              </Pressable>
            )}
            {hasWorkouts && (
              <Pressable
                testID="header-add-button"
                className="bg-primary h-10 w-10 items-center justify-center rounded-full"
                onPress={onAddWorkout}
              >
                <Ionicons name="add" size={24} className="text-white" />
              </Pressable>
            )}
          </View>
        </View>

        {!hasWorkouts ? (
          <View className="flex-1 items-center justify-center gap-3">
            <Ionicons name="barbell-outline" size={72} className="text-muted" />
            <Heading size="lg" className="mt-2">
              No workouts yet
            </Heading>
            <Text className="text-center text-sm opacity-50">
              Create your first workout to get started
            </Text>
            <Pressable
              className="bg-primary mt-2 flex-row items-center gap-2 rounded-xl px-6 py-3.5"
              onPress={onAddWorkout}
            >
              <Ionicons name="add" size={20} className="text-primary" />
              <Text className="font-semibold text-secondary-0">
                Add Workout
              </Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

function withHome(Component: typeof HomeView) {
  return function HomeContainer() {
    const { workouts } = useWorkouts();
    const { workoutLogs, toggleWorkoutComplete, restartRoutine } =
      useWorkoutLogs();
    const router = useRouter();

    return (
      <Component
        workouts={workouts}
        workoutLogs={workoutLogs}
        onAddWorkout={() => router.navigate('/(tabs)/workouts')}
        onWorkoutPress={(id) => router.push(`/workout-log/${id}`)}
        onWorkoutCheck={(workout) => toggleWorkoutComplete(workout)}
        onRestartRoutine={restartRoutine}
      />
    );
  };
}

export default withHome(HomeView);
