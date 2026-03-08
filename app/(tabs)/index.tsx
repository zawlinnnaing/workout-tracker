import { ThemedView } from '@/components/ThemedView';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { useWorkouts } from '@/contexts/WorkoutContext';
import { Workout } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeViewProps {
  workouts: Workout[];
  onAddWorkout: () => void;
  onWorkoutPress: (id: string) => void;
}

function HomeView({ workouts, onAddWorkout, onWorkoutPress }: HomeViewProps) {
  const hasWorkouts = workouts.length > 0;

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <Pressable
      className="flex-row items-center justify-between rounded-xl bg-background-0 p-4 shadow-hard-2"
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      onPress={() => onWorkoutPress(item.id)}
    >
      <View className="flex-1 gap-1">
        <Heading size="lg">{item.name}</Heading>
        <Text className="text-[13px] opacity-60">
          {item.exercises.length} exercise
          {item.exercises.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} className="text-muted" />
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-background-0 py-4">
      <ThemedView className="flex-1 px-4">
        <View className="mb-5 flex-row items-center justify-between">
          <Heading size="2xl">
            {hasWorkouts ? 'My Workouts' : 'Get Started'}
          </Heading>
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
    const router = useRouter();

    return (
      <Component
        workouts={workouts}
        onAddWorkout={() => router.navigate('/(tabs)/workouts')}
        onWorkoutPress={(id) => router.push(`/workout/${id}`)}
      />
    );
  };
}

export default withHome(HomeView);
