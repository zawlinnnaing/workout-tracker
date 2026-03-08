import { AsyncStorageWorkout } from './AsyncStorageWorkout';
import { WorkoutStorage } from './WorkoutStorage';

export type { WorkoutStorage as IWorkoutStorage };

export const workoutStorage: WorkoutStorage = new AsyncStorageWorkout();
