import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { capitalizeFirstLetter, filterOutObjectKeys, objectKeys } from '@infrastructure/utils';

import { isString } from '../../guards/is-string/is-string.function';
import { fieldToValidatorsMapper } from './use-form.defaults';
import { IUseFormParams, TErrorMessages } from './use-form.types';

const validateFormState = <TFormValues extends object>(newFormState: TFormValues) =>
  objectKeys(fieldToValidatorsMapper).reduce((_accumulator, _fieldName) => {
    const fieldValidators = fieldToValidatorsMapper[_fieldName];

    const validator = fieldValidators.find(
      // @ts-expect-error
      (_validator) => !_validator.validate(newFormState[_fieldName]),
    );

    if (!validator) {
      return _accumulator;
    }

    return { ..._accumulator, [_fieldName]: validator?.message || '' };
  }, {} as TErrorMessages<TFormValues>);

export const useForm = <TFormValues extends object>({
  initialValues,
}: IUseFormParams<TFormValues>) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState(initialValues);
  const [errors, setErrors] = useState<TErrorMessages<TFormValues> | null>(null);

  const getFormStateWithReformattedData = useCallback(
    () =>
      objectKeys(formState).reduce((_accumulator, _fieldName) => {
        const fieldValue = formState[_fieldName];

        if (!isString(fieldValue)) {
          return { ..._accumulator, [_fieldName]: fieldValue };
        }

        return { ..._accumulator, [_fieldName]: fieldValue.trim() };
      }, formState),
    [formState],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    if (isSubmitted) {
      const validators = fieldToValidatorsMapper[name] || [];

      const filteredErrors = filterOutObjectKeys(errors, name)!;
      const validator = validators.find((_validator) => !_validator.validate(value));

      setErrors({ ...filteredErrors, [name]: validator?.message || '' });
    }

    setFormState((_prevState) => ({ ..._prevState, [name]: value }));
  };

  const reset = () => {
    setErrors(null);
    setFormState(initialValues);
  };

  const handleSubmit =
    (onSubmit: (formData: TFormValues, event: FormEvent<HTMLDivElement>) => void) =>
    (event: FormEvent<HTMLDivElement>) => {
      event.preventDefault();

      const newFormState = getFormStateWithReformattedData();
      const newErrors = validateFormState(newFormState);

      setIsSubmitted(true);
      setErrors(newErrors);
      setFormState(newFormState);

      const isValid = objectKeys(newErrors).length === 0;
      const isEmpty = objectKeys(newFormState).every((_key) => !formState[_key]);

      if (!isValid || isEmpty) {
        return;
      }

      onSubmit(formState, event);
    };

  const generateFieldProps = (name: keyof TFormValues) => {
    const label = capitalizeFirstLetter(name as string);
    const placeholder = `Your ${label}...`;

    return {
      name,
      label,
      placeholder,
      value: formState[name],
      onChange: handleInputChange,
      errorMessage: errors?.[name],
    };
  };

  const setValue = (fieldName: keyof TFormValues, newValue: string) =>
    setFormState((_prevState) => ({ ..._prevState, [fieldName]: newValue }));

  return {
    reset,
    setValue,
    formState,
    generateFieldProps,
    onSubmitWrapper: handleSubmit,
  };
};
