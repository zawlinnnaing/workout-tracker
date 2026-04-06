import { AppSettings } from '@/types/settings-types';
import { ExerciseLog, Workout, WorkoutLog } from '@/types/workout';

type SerializedWorkout = Omit<Workout, 'createdAt' | 'completedAt'> & {
  createdAt: string;
  completedAt?: string;
};

type SerializedExerciseLog = Omit<ExerciseLog, 'completedAt'> & {
  completedAt?: string;
};

type SerializedWorkoutLog = Omit<
  WorkoutLog,
  'exercises' | 'completedAt' | 'workout'
> & {
  workout: Omit<WorkoutLog['workout'], 'createdAt' | 'completedAt'> & {
    createdAt: string;
    completedAt?: string;
  };
  exercises: SerializedExerciseLog[];
  completedAt?: string;
};

function toDate(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

export function parseLegacyWorkouts(raw: string | null): Workout[] {
  if (!raw) return [];

  const parsed = JSON.parse(raw) as SerializedWorkout[];
  return parsed.map((workout) => ({
    ...workout,
    createdAt: new Date(workout.createdAt),
    completedAt: toDate(workout.completedAt),
  }));
}

export function serializeLegacyWorkouts(workouts: Workout[]): string {
  return JSON.stringify(workouts);
}

export function parseLegacyWorkoutLogs(
  raw: string | null,
): Record<string, WorkoutLog> {
  if (!raw) return {};

  const parsed = JSON.parse(raw) as Record<string, SerializedWorkoutLog>;
  const result: Record<string, WorkoutLog> = {};

  for (const [workoutId, log] of Object.entries(parsed)) {
    result[workoutId] = {
      ...log,
      completedAt: toDate(log.completedAt),
      workout: {
        ...log.workout,
        createdAt: new Date(log.workout.createdAt),
        completedAt: toDate(log.workout.completedAt),
      },
      exercises: log.exercises.map((exercise) => ({
        ...exercise,
        completedAt: toDate(exercise.completedAt),
      })),
    };
  }

  return result;
}

export function serializeLegacyWorkoutLogs(
  logs: Record<string, WorkoutLog>,
): string {
  return JSON.stringify(logs);
}

export function parseLegacyWorkoutHistory(raw: string | null): WorkoutLog[] {
  if (!raw) return [];

  const parsed = JSON.parse(raw) as SerializedWorkoutLog[];
  return parsed.map((log) => ({
    ...log,
    completedAt: toDate(log.completedAt),
    workout: {
      ...log.workout,
      createdAt: new Date(log.workout.createdAt),
      completedAt: toDate(log.workout.completedAt),
    },
    exercises: log.exercises.map((exercise) => ({
      ...exercise,
      completedAt: toDate(exercise.completedAt),
    })),
  }));
}

export function serializeLegacyWorkoutHistory(logs: WorkoutLog[]): string {
  return JSON.stringify(logs);
}

export function parseLegacySettings(raw: string | null): AppSettings | null {
  if (!raw) return null;
  return JSON.parse(raw) as AppSettings;
}

export function serializeLegacySettings(settings: AppSettings): string {
  return JSON.stringify(settings);
}
