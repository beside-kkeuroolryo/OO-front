import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          <div>
            저장에 실패했습니다.
            <br />
            {error.message && error.message}
          </div>,
        );
      }
    }
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
