// src/useLocalStorage.js, final code

import { useState, useEffect } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    let currentValue = null;

    try {
      currentValue = JSON.parse(localStorage.getItem(key));
    } catch (error) {
      currentValue = null;
    }

    return currentValue;
  });

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
