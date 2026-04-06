import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageSettings } from './AsyncStorageSettings';

import { DEFAULT_SETTINGS } from '@/utils/settings';

const storage = new AsyncStorageSettings();

const sampleSettings = {
  ...DEFAULT_SETTINGS,
  notifications: {
    ...DEFAULT_SETTINGS.notifications,
    enabled: true,
    workoutDays: 4,
    breakDays: 2,
    sendHour: 6,
    sendMinute: 30,
    patternAnchorDate: '2026-04-06',
  },
};

describe('AsyncStorageSettings', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('round-trips notification settings through AsyncStorage', async () => {
    await storage.save(sampleSettings);

    await expect(storage.load()).resolves.toEqual(sampleSettings);
  });
});
