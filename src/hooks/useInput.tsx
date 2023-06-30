import React, { useCallback, useState } from 'react';

export type UseInputReturn = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [],
  );
  const onClear = useCallback(() => setValue(''), []);
  return { value, onChange, onClear };
}
