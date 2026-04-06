import AsyncStorage from '@react-native-async-storage/async-storage';

import { Workout } from '@/types/workout';

import { LEGACY_STORAGE_KEYS } from './legacyKeys';
import {
  parseLegacyWorkouts,
  serializeLegacyWorkouts,
} from './legacySerialization';
import { WorkoutStorage } from '../WorkoutStorage';

export class AsyncStorageWorkout implements WorkoutStorage {
  private readonly key = LEGACY_STORAGE_KEYS.workouts;

  async load(): Promise<Workout[]> {
    const raw = await AsyncStorage.getItem(this.key);
    return parseLegacyWorkouts(raw);
  }

  async save(workouts: Workout[]): Promise<void> {
    await AsyncStorage.setItem(this.key, serializeLegacyWorkouts(workouts));
  }
}
