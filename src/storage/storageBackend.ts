import { SettingsStorage } from './SettingsStorage';
import { WorkoutHistoryStorage } from './WorkoutHistoryStorage';
import { WorkoutLogStorage } from './WorkoutLogStorage';
import { WorkoutStorage } from './WorkoutStorage';

export interface StorageBackend {
  readonly name: 'sqlite' | 'legacy-json';
  readonly workoutStorage: WorkoutStorage;
  readonly workoutLogStorage: WorkoutLogStorage;
  readonly workoutHistoryStorage: WorkoutHistoryStorage;
  readonly settingsStorage: SettingsStorage;
  initialize(): Promise<void>;
  clearAll(): Promise<void>;
}
