import { InputProps } from '../Types';

export default function GenericInputType(GenericInputProps: InputProps) {
  const { input, register, errors } = GenericInputProps;

  return (
    <>
      <div
        key={input.label}
        className={`input ${input.className ?? input.label}`}
      >
        <label htmlFor={input.label}>{input.label}:</label>
        <input
          id={input.label}
          type={input.inputType}
          maxLength={input.maxLength}
          step={input.step}
          {...register(input.label)}
          required={input.required}
        />
      </div>
      {errors[input.label]?.message && (
        <p className="error">{`${errors[input.label]?.message}`}</p>
      )}
    </>
  );
}
