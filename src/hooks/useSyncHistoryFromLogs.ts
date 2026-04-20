import { useEffect } from 'react';

import { workoutHistoryStorage } from '@/storage';
import { useWorkoutHistoryStore } from '@/store/workoutHistoryStore';
import { useWorkoutRoutineStore } from '@/store/workoutRoutineStore';
import { WorkoutLog } from '@/types/workout';

function getHistoryEntryId(log: WorkoutLog): string {
  return `${log.workout.id}:${log.completedAt?.toISOString()}`;
}

function toHistoryEntry(log: WorkoutLog): WorkoutLog {
  return {
    ...log,
    id: getHistoryEntryId(log),
  };
}

export function useSyncHistoryFromLogs() {
  const workoutLogs = useWorkoutRoutineStore((state) => state.workoutLogs);
  const setHistory = useWorkoutHistoryStore((state) => state.setHistory);

  useEffect(() => {
    const logsToSync = Object.values(workoutLogs).filter(
      (log) => !!log.completedAt,
    );
    if (logsToSync.length === 0) return;

    void (async () => {
      const existing = await workoutHistoryStorage.load();
      const map = new Map(existing.map((log) => [getHistoryEntryId(log), log]));
      logsToSync.forEach((log) =>
        map.set(getHistoryEntryId(log), toHistoryEntry(log)),
      );
      const merged = Array.from(map.values());
      await workoutHistoryStorage.save(merged);
      setHistory(merged);
    })().catch((error) => {
      console.error(
        '[storage] Failed to sync workout history from logs.',
        error,
      );
    });
  }, [workoutLogs, setHistory]);
}
