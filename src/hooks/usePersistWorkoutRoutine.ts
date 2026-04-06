import { useEffect } from 'react';

import { workoutLogStorage } from '@/storage';
import { useWorkoutRoutineStore } from '@/store/workoutRoutineStore';

export function usePersistWorkoutRoutine() {
  const workoutLogs = useWorkoutRoutineStore((state) => state.workoutLogs);
  const isLoaded = useWorkoutRoutineStore((state) => state.isLoaded);

  useEffect(() => {
    if (!isLoaded) return;
    workoutLogStorage.save(workoutLogs);
  }, [workoutLogs, isLoaded]);
}
