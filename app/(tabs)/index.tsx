import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ThemedView } from '@/components/ThemedView';
import { useWorkouts } from '@/contexts/WorkoutContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Workout } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeViewProps {
  workouts: Workout[];
  showInput: boolean;
  newWorkoutName: string;
  onNewWorkoutNameChange: (name: string) => void;
  onShowInput: () => void;
  onHideInput: () => void;
  onCreateWorkout: () => void;
  onWorkoutPress: (id: string) => void;
}

function HomeView({
  workouts,
  showInput,
  newWorkoutName,
  onNewWorkoutNameChange,
  onShowInput,
  onHideInput,
  onCreateWorkout,
  onWorkoutPress,
}: HomeViewProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const hasWorkouts = workouts.length > 0;

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <Pressable
      style={({ pressed }) => [
        styles.workoutItem,
        { opacity: pressed ? 0.7 : 1, backgroundColor },
      ]}
      onPress={() => onWorkoutPress(item.id)}
    >
      <View style={styles.workoutItemContent}>
        <Heading size="lg">{item.name}</Heading>
        <Text style={styles.workoutMeta}>
          {item.exercises.length} exercise
          {item.exercises.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={textColor + '60'} />
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <Heading size="2xl">
            {hasWorkouts ? 'My Workouts' : 'Get Started'}
          </Heading>
          {hasWorkouts && (
            <Pressable
              style={[styles.addButton, { backgroundColor: primaryColor }]}
              onPress={onShowInput}
            >
              <Ionicons name="add" size={24} color={backgroundColor} />
            </Pressable>
          )}
        </View>

        {showInput && (
          <View style={[styles.inputCard, { borderColor: primaryColor }]}>
            <TextInput
              style={[
                styles.input,
                { borderColor: primaryColor, color: textColor },
              ]}
              placeholder="Workout name"
              placeholderTextColor={textColor + '80'}
              value={newWorkoutName}
              onChangeText={onNewWorkoutNameChange}
              autoFocus
              onSubmitEditing={onCreateWorkout}
            />
            <View style={styles.inputActions}>
              <Pressable
                style={[
                  styles.inputActionButton,
                  { borderColor: primaryColor },
                ]}
                onPress={onHideInput}
              >
                <Text>Cancel</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.inputActionButton,
                  styles.createButton,
                  { backgroundColor: primaryColor },
                ]}
                onPress={onCreateWorkout}
              >
                <Text style={{ color: backgroundColor, fontWeight: '600' }}>
                  Create
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {!hasWorkouts && !showInput ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="barbell-outline"
              size={72}
              color={textColor + '30'}
            />
            <Heading size="lg" style={styles.emptyTitle}>
              No workouts yet
            </Heading>
            <Text style={[styles.emptySubtitle, { color: textColor + '80' }]}>
              Create your first workout to get started
            </Text>
            <Pressable
              style={[styles.ctaButton, { backgroundColor: primaryColor }]}
              onPress={onShowInput}
            >
              <Ionicons name="add" size={20} color={backgroundColor} />
              <Text style={{ color: backgroundColor, fontWeight: '600' }}>
                Add Workout
              </Text>
            </Pressable>
          </View>
        ) : (
          hasWorkouts && (
            <FlatList
              data={workouts}
              renderItem={renderWorkoutItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

function withHome(Component: typeof HomeView) {
  return function HomeContainer() {
    const { workouts, addWorkout } = useWorkouts();
    const router = useRouter();
    const [showInput, setShowInput] = useState(false);
    const [newWorkoutName, setNewWorkoutName] = useState('');

    const handleCreateWorkout = () => {
      if (newWorkoutName.trim()) {
        const workout = addWorkout(newWorkoutName.trim());
        setNewWorkoutName('');
        setShowInput(false);
        router.push(`/workout/${workout.id}`);
      }
    };

    return (
      <Component
        workouts={workouts}
        showInput={showInput}
        newWorkoutName={newWorkoutName}
        onNewWorkoutNameChange={setNewWorkoutName}
        onShowInput={() => setShowInput(true)}
        onHideInput={() => {
          setShowInput(false);
          setNewWorkoutName('');
        }}
        onCreateWorkout={handleCreateWorkout}
        onWorkoutPress={(id) => router.push(`/workout/${id}`)}
      />
    );
  };
}

export default withHome(HomeView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputActions: {
    flexDirection: 'row',
    gap: 12,
  },
  inputActionButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  createButton: {
    borderWidth: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyTitle: {
    marginTop: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    fontSize: 14,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutItemContent: {
    flex: 1,
    gap: 4,
  },
  workoutMeta: {
    fontSize: 13,
    opacity: 0.6,
  },
  list: {
    gap: 12,
  },
});
