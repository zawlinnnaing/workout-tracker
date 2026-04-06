export const LEGACY_STORAGE_KEYS = {
  workouts: 'workouts',
  workoutLogs: 'workoutLogs',
  workoutHistory: 'workoutHistory',
  appSettings: 'app_settings',
} as const;

export const LEGACY_STORAGE_KEY_LIST = [
  LEGACY_STORAGE_KEYS.workouts,
  LEGACY_STORAGE_KEYS.workoutLogs,
  LEGACY_STORAGE_KEYS.workoutHistory,
  LEGACY_STORAGE_KEYS.appSettings,
];
