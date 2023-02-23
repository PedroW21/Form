import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

export type inputAttributes = {
  label: string;
  inputType: string;
  className?: string;
  maxLength?: number;
  regex?: RegExp;
  message?: string;
  required?: boolean;
  mask?: string;
  step?: number;
};

export type InputsProps = {
  configArr: inputAttributes[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  controllerHooksForm: Control<FieldValues, any>;
};

export type InputProps = {
  input: inputAttributes;
  errors: InputsProps['errors'];
  register: UseFormRegister<FieldValues>;
  classname: string;
  options?: { pattern: { value: RegExp; message: string } }
};

type MaskedInputType = Omit<InputProps, 'register'>;


export type MaskedInputOptions = {
  controllerHooksForm: InputsProps['controllerHooksForm'];
  options: { pattern: { value: RegExp; message: string } }
} & MaskedInputType;
