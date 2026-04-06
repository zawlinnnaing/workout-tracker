import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageSettings } from './AsyncStorageSettings';
import { AsyncStorageWorkout } from './AsyncStorageWorkout';
import { AsyncStorageWorkoutHistory } from './AsyncStorageWorkoutHistory';
import { AsyncStorageWorkoutLog } from './AsyncStorageWorkoutLog';
import { LEGACY_STORAGE_KEY_LIST } from './legacyKeys';
import { StorageBackend } from '../storageBackend';

export function createLegacyStorageBackend(): StorageBackend {
  return {
    name: 'legacy-json',
    workoutStorage: new AsyncStorageWorkout(),
    workoutLogStorage: new AsyncStorageWorkoutLog(),
    workoutHistoryStorage: new AsyncStorageWorkoutHistory(),
    settingsStorage: new AsyncStorageSettings(),
    async initialize() {
      // AsyncStorage requires no initialization.
    },
    async clearAll() {
      await AsyncStorage.multiRemove(LEGACY_STORAGE_KEY_LIST);
    },
  };
}
