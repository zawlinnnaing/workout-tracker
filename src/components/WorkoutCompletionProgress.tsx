import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Exercise, ExerciseLog } from '@/types/workout';
import { View } from 'react-native';

interface WorkoutCompletionProgressProps {
  exercises: Exercise[];
  exerciseLogs?: ExerciseLog[];
  testID?: string;
}

export function WorkoutCompletionProgress({
  exercises,
  exerciseLogs,
  testID,
}: WorkoutCompletionProgressProps) {
  const totalSets = exercises.reduce((sum, e) => sum + e.numberOfSets, 0);

  if (totalSets === 0) {
    return null;
  }

  const completedSets = exerciseLogs?.reduce(
    (sum, log) => sum + log.completedSets,
    0,
  );
  const completionRate = Math.min(
    100,
    Math.round(((completedSets ?? 0) / totalSets) * 100),
  );

  return (
    <Card
      testID={testID}
      variant="filled"
      className="mb-6 rounded-2xl px-4 py-4"
    >
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xs font-bold uppercase tracking-widest opacity-50">
          Completion
        </Text>
        <View className="flex-row items-baseline gap-0.5">
          <Text className="text-base font-black">{completionRate}</Text>
          <Text className="text-sm font-bold uppercase tracking-widest opacity-50">
            %
          </Text>
        </View>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-background-100">
        <View
          className="h-full rounded-full bg-typography-950"
          style={{ width: `${completionRate}%` }}
        />
      </View>
    </Card>
  );
}
