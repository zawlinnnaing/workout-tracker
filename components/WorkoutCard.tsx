import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Workout } from '@/types/workout';
import { Trash2 } from '@/components/icons';
import { Pressable, View } from 'react-native';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
  onDelete: () => void;
}

export function WorkoutCard({ workout, onPress, onDelete }: WorkoutCardProps) {
  return (
    <Card>
      <Pressable
        className="flex-row items-center justify-between"
        onPress={onPress}
      >
        <View className="flex-1">
          <Heading size="lg">{workout.name}</Heading>
          <Text className="mt-1 text-sm opacity-70">
            {workout.exercises.length} exercise
            {workout.exercises.length !== 1 ? 's' : ''}
          </Text>
          <Text className="mt-1 text-xs opacity-50">
            {new Date(workout.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <Pressable className="p-2" onPress={onDelete} testID="delete-button">
          <Trash2 size={24} color="red" />
        </Pressable>
      </Pressable>
    </Card>
  );
}
