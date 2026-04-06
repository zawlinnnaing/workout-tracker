import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppSettings } from '@/types/settings-types';

import { LEGACY_STORAGE_KEYS } from './legacyKeys';
import {
  parseLegacySettings,
  serializeLegacySettings,
} from './legacySerialization';
import { SettingsStorage } from '../SettingsStorage';

export class AsyncStorageSettings implements SettingsStorage {
  private readonly key = LEGACY_STORAGE_KEYS.appSettings;

  async load(): Promise<AppSettings | null> {
    const raw = await AsyncStorage.getItem(this.key);
    return parseLegacySettings(raw);
  }

  async save(settings: AppSettings): Promise<void> {
    await AsyncStorage.setItem(this.key, serializeLegacySettings(settings));
  }
}
