import { IInputProps } from '@ui/atoms';

export interface IInputControlProps extends IInputProps {
  errorMessage?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
}
