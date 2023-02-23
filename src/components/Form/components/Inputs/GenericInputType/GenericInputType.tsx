import { InputProps } from '../Types';

export default function GenericInputType(GenericInputProps: InputProps) {
  const { input, register, errors, classname, options } = GenericInputProps;

  return (
    <div key={input.label} className="GenericInputContainer">
      <div className={classname}>
        <label htmlFor={input.label}>{input.label}:</label>
        <input
          id={input.label}
          type={input.inputType}
          maxLength={input.maxLength}
          step={input.step}
          {...register(input.label, options)}
          required={input.required}
        />
      </div>
      {errors[input.label]?.message && (
        <p className="error">{`${errors[input.label]?.message}`}</p>
      )}
    </div>
  );
}
