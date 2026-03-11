import React, { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useWorkoutLogStore } from '@/store/workoutLogStore';
import { useWorkoutStore } from '@/store/workoutStore';

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const loadWorkouts = useWorkoutStore((state) => state.loadWorkouts);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return <>{children}</>;
}

export function useWorkouts() {
  return useWorkoutStore(
    useShallow((state) => ({
      workouts: state.workouts,
      addWorkout: state.addWorkout,
      updateWorkout: state.updateWorkout,
      deleteWorkout: state.deleteWorkout,
      addExerciseToWorkout: state.addExerciseToWorkout,
      updateExercise: state.updateExercise,
      deleteExercise: state.deleteExercise,
      getWorkoutById: state.getWorkoutById,
    })),
  );
}

export function WorkoutLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadLogs = useWorkoutLogStore((state) => state.loadLogs);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  return <>{children}</>;
}

export function useWorkoutLogs() {
  return useWorkoutLogStore(
    useShallow((state) => ({
      workoutLogs: state.workoutLogs,
      completeSet: state.completeSet,
      completeExercise: state.completeExercise,
      toggleWorkoutComplete: state.toggleWorkoutComplete,
      restartRoutine: state.restartRoutine,
      getLog: state.getLog,
    })),
  );
}
