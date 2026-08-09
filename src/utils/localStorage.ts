export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Failed to load "${key}" from localStorage:`, error);
    return null;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T): boolean => {
  try {
    const serializedValue = JSON.stringify(value);

    localStorage.setItem(key, serializedValue);

    return true;
  } catch (error) {
    console.error(`Failed to save "${key}" to localStorage:`, error);

    return false;
  }
};
