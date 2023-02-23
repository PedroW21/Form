import { InputProps } from '../Types';

export default function CheckboxInputType(CheckboxProps: InputProps) {
  const { input, register } = CheckboxProps;

  return (
    <div className={`input ${input.label}`}>
      <span>{input.label}:</span>
      <label htmlFor={input.label} className="switch">
        <input
          id={input.label}
          type={input.inputType}
          maxLength={input.maxLength}
          {...register(input.label)}
          required={input.required}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
