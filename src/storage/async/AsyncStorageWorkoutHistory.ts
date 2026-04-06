import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkoutLog } from '@/types/workout';

import { LEGACY_STORAGE_KEYS } from './legacyKeys';
import {
  parseLegacyWorkoutHistory,
  serializeLegacyWorkoutHistory,
} from './legacySerialization';
import { WorkoutHistoryStorage } from '../WorkoutHistoryStorage';

export class AsyncStorageWorkoutHistory implements WorkoutHistoryStorage {
  private readonly key = LEGACY_STORAGE_KEYS.workoutHistory;

  async load(): Promise<WorkoutLog[]> {
    const raw = await AsyncStorage.getItem(this.key);
    return parseLegacyWorkoutHistory(raw);
  }

  async save(logs: WorkoutLog[]): Promise<void> {
    await AsyncStorage.setItem(this.key, serializeLegacyWorkoutHistory(logs));
  }
}
