import { FC, ChangeEvent, SyntheticEvent } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';

interface WithLabelProps extends Omit<FormControlLabelProps, 'control'> {
  label: string;
  checked: boolean;
  onChange: (event: SyntheticEvent<Element, Event>, checked: boolean) => void;
}

interface WithoutLabelProps extends CheckboxProps {
  label?: never;
}

type PrimaryCheckboxProps = WithLabelProps | WithoutLabelProps;
const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
export const PrimaryCheckbox: FC<PrimaryCheckboxProps> = ({
  checked,
  onChange,
  ...props
}) => {
  const { label, ...formControlLabelProps } = props as WithLabelProps;
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} onChange={onChange} />}
      aria-label={checkboxId}
      {...formControlLabelProps}
    />
  );
};
