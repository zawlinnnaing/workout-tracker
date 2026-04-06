import { createLegacyStorageBackend } from './async/createLegacyStorageBackend';
import { createSQLiteStorageBackend } from './sqlite/createSQLiteStorageBackend';
import { SettingsStorage } from './SettingsStorage';
import { StorageBackend } from './storageBackend';
import { WorkoutHistoryStorage } from './WorkoutHistoryStorage';
import { WorkoutLogStorage } from './WorkoutLogStorage';
import { WorkoutStorage } from './WorkoutStorage';

const legacyBackend = createLegacyStorageBackend();
const sqliteBackend = createSQLiteStorageBackend();

let activeBackend: StorageBackend = legacyBackend;
let initializePromise: Promise<void> | null = null;

async function withStorageBackend<T>(
  work: (backend: StorageBackend) => Promise<T>,
): Promise<T> {
  await initializeStorage();
  return work(activeBackend);
}

export type { WorkoutStorage as IWorkoutStorage };
export type { WorkoutLogStorage as IWorkoutLogStorage };
export type { WorkoutHistoryStorage as IWorkoutHistoryStorage };
export type { SettingsStorage as ISettingsStorage };

export async function initializeStorage(): Promise<void> {
  if (initializePromise) {
    return initializePromise;
  }

  initializePromise = (async () => {
    try {
      await sqliteBackend.initialize();
      activeBackend = sqliteBackend;
    } catch (error) {
      console.error(
        '[storage] SQLite initialization failed. Falling back to legacy JSON storage for this session.',
        error,
      );
      await legacyBackend.initialize();
      activeBackend = legacyBackend;
    }
  })();

  return initializePromise;
}

export function getActiveStorageBackendName(): StorageBackend['name'] {
  return activeBackend.name;
}

export async function clearAllStorage(): Promise<void> {
  const results = await Promise.allSettled([
    legacyBackend.clearAll(),
    sqliteBackend.clearAll(),
  ]);

  const failures = results.filter(
    (result): result is PromiseRejectedResult => result.status === 'rejected',
  );

  if (failures.length > 0) {
    console.error('[storage] Failed to clear one or more storage backends.', {
      failures: failures.map((failure) => failure.reason),
    });
  }
}

export const workoutStorage: WorkoutStorage = {
  load() {
    return withStorageBackend((backend) => backend.workoutStorage.load());
  },
  save(workouts) {
    return withStorageBackend((backend) =>
      backend.workoutStorage.save(workouts),
    );
  },
};

export const workoutLogStorage: WorkoutLogStorage = {
  load() {
    return withStorageBackend((backend) => backend.workoutLogStorage.load());
  },
  save(logs) {
    return withStorageBackend((backend) =>
      backend.workoutLogStorage.save(logs),
    );
  },
};

export const workoutHistoryStorage: WorkoutHistoryStorage = {
  load() {
    return withStorageBackend((backend) =>
      backend.workoutHistoryStorage.load(),
    );
  },
  save(logs) {
    return withStorageBackend((backend) =>
      backend.workoutHistoryStorage.save(logs),
    );
  },
};

export const settingsStorage: SettingsStorage = {
  load() {
    return withStorageBackend((backend) => backend.settingsStorage.load());
  },
  save(settings) {
    return withStorageBackend((backend) =>
      backend.settingsStorage.save(settings),
    );
  },
};
