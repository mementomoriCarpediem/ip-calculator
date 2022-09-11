import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import React from 'react';

interface Props<T> extends SelectProps<T> {
  title: string;
  menuItemMapper: Record<string, string>;
  state: T;
  setState: (state: T) => void;
}

function SingleSelector<T>({
  title,
  menuItemMapper,
  state,
  setState,
}: Props<T>) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${title}-select-label`}>{title}</InputLabel>
      <Select<T>
        labelId={`${title}-select-label`}
        id={`${title}-select`}
        value={state}
        label={title}
        onChange={(e) => setState(e.target.value as T)}
      >
        {Object.keys(menuItemMapper).map((key) => (
          <MenuItem key={key} value={key}>
            {menuItemMapper[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SingleSelector;
