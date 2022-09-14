import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type Props<T> = {
  label: string;
  state: T;
  setState: (state: T) => void;
} & TextFieldProps;

function InputField<T>({ label, state, setState, ...props }: Props<T>) {
  return (
    <TextField
      fullWidth
      label={label}
      value={state}
      onChange={(e) => {
        const value = Number(e.target.value);
        typeof state === 'number'
          ? !Number.isNaN(value) && setState(value as T)
          : setState(value as T);
      }}
      {...props}
    />
  );
}

export default InputField;
