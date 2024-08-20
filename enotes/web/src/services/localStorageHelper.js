/**
 * Local Storage helper functions
 */

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageItem = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const clearLocalStorageItem = (key) => {
  localStorage.clearItem(key);
};

export const clearAllLocalStorage = () => {
  localStorage.clear();
}
;
