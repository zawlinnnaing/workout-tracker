import { AsyncStorageWorkout } from './AsyncStorageWorkout';
import { AsyncStorageWorkoutLog } from './AsyncStorageWorkoutLog';
import { WorkoutLogStorage } from './WorkoutLogStorage';
import { WorkoutStorage } from './WorkoutStorage';

export type { WorkoutStorage as IWorkoutStorage };
export type { WorkoutLogStorage as IWorkoutLogStorage };

export const workoutStorage: WorkoutStorage = new AsyncStorageWorkout();
export const workoutLogStorage: WorkoutLogStorage = new AsyncStorageWorkoutLog();
