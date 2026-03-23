import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Exercise } from '@/types/workout';
import { View } from 'react-native';

interface WorkoutStatsProps {
  exercises: Exercise[];
}

export function WorkoutStats({ exercises }: WorkoutStatsProps) {
  const totalReps = exercises.reduce(
    (sum, e) => sum + e.reps * e.numberOfSets,
    0,
  );
  const totalSets = exercises.reduce((sum, e) => sum + e.numberOfSets, 0);
  const estMinutes = Math.round((totalReps * 3 + totalSets * 90) / 60);

  return (
    <View className="mt-5 flex-row gap-3">
      <Card variant="filled" className="flex-1 rounded-2xl px-4 py-4">
        <Text className="mb-1 text-xs font-bold uppercase tracking-widest opacity-50">
          Total Reps
        </Text>
        <Text style={{ fontSize: 36, fontWeight: '800', lineHeight: 40 }}>
          {totalReps}
        </Text>
      </Card>
      <Card variant="filled" className="flex-1 rounded-2xl px-4 py-4">
        <Text className="mb-1 text-xs font-bold uppercase tracking-widest opacity-50">
          Est. Time
        </Text>
        <View className="flex-row items-baseline gap-1">
          <Text style={{ fontSize: 36, fontWeight: '800', lineHeight: 40 }}>
            {estMinutes}
          </Text>
          <Text className="text-sm font-bold uppercase tracking-widest opacity-50">
            min
          </Text>
        </View>
      </Card>
    </View>
  );
}
