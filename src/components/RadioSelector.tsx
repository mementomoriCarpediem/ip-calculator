import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import React from 'react';

type Props<T> = {
  title: string;
  state: T;
  setState: (state: T) => void;
  optionListMapper: Record<string, string>;
} & RadioGroupProps;

function RadioSelector<T>({
  title,
  state,
  setState,
  optionListMapper,
  ...props
}: Props<T>) {
  return (
    <FormControl>
      <FormLabel id={`${title}-radio-buttons-group-label`}>{title}</FormLabel>
      <RadioGroup<T>
        aria-labelledby={`${title}-radio-buttons-group-label`}
        name="row-radio-buttons-group"
        {...props}
        value={state}
        onChange={(e) => setState(e.target.value as T)}
      >
        {Object.keys(optionListMapper).map((key) => (
          <FormControlLabel
            key={key}
            value={key}
            control={<Radio />}
            label={optionListMapper[key]}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioSelector;
