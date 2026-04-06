import AsyncStorage from '@react-native-async-storage/async-storage';

import { WorkoutLog } from '@/types/workout';

import { LEGACY_STORAGE_KEYS } from './legacyKeys';
import {
  parseLegacyWorkoutLogs,
  serializeLegacyWorkoutLogs,
} from './legacySerialization';
import { WorkoutLogStorage } from '../WorkoutLogStorage';

export class AsyncStorageWorkoutLog implements WorkoutLogStorage {
  private readonly key = LEGACY_STORAGE_KEYS.workoutLogs;

  async load(): Promise<Record<string, WorkoutLog>> {
    const raw = await AsyncStorage.getItem(this.key);
    return parseLegacyWorkoutLogs(raw);
  }

  async save(logs: Record<string, WorkoutLog>): Promise<void> {
    await AsyncStorage.setItem(this.key, serializeLegacyWorkoutLogs(logs));
  }
}
