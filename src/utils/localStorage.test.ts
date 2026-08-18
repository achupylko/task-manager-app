import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('loadFromLocalStorage', () => {
  test('returns parsed value when stored data exists', () => {
    const key = 'settings';
    const value = { theme: 'dark' };

    localStorage.setItem(key, JSON.stringify(value));

    const result = loadFromLocalStorage(key);

    expect(result).toEqual(value);
  });

  test('returns null when key does not exist', () => {
    const result = loadFromLocalStorage('missing-key');

    expect(result).toBe(null);
  });

  test('returns null when stored data is invalid JSON', () => {
    const key = 'settings';

    localStorage.setItem(key, '{invalid-json');

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = loadFromLocalStorage(key);

    expect(result).toBe(null);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe('saveToLocalStorage', () => {
  test('saves serialized value and returns true', () => {
    const key = 'settings';
    const value = { theme: 'dark' };

    const result = saveToLocalStorage(key, value);
    const savedValue = localStorage.getItem(key);

    expect(result).toBe(true);
    expect(savedValue).toBe(JSON.stringify(value));
  });

  test('returns false when value cannot be serialized', () => {
    const key = 'settings';
    const value = undefined;

    const result = saveToLocalStorage(key, value);
    const savedValue = localStorage.getItem(key);

    expect(result).toBe(false);
    expect(savedValue).toBe(null);
  });

  test('returns false when localStorage.setItem throws', () => {
    const key = 'settings';
    const value = { theme: 'dark' };

    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Storage unavailable');
      });

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = saveToLocalStorage(key, value);

    expect(result).toBe(false);
    expect(setItemSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
