import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Control,
  Controller,
} from 'react-hook-form';
import MaskedInput from 'react-input-mask';

type configObj = {
  label: string;
  inputType: string;
  className?: string;
  maxLength?: number;
  regex?: RegExp;
  message?: string;
  required?: boolean;
  mask?: string;
};

type InputsProps = {
  configArr: configObj[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  controllerHooksForm: Control<FieldValues, any>;
};

export default function Inputs(arrElements: InputsProps) {
  const { register, errors, controllerHooksForm } = arrElements;

  const renderTextArea = (label: string) => (
    <div key={label} className={`input ${label}`}>
      <label htmlFor={label}>Text:</label>
      <textarea id={label}></textarea>
    </div>
  );

  const renderInput = (obj: configObj) => {
    if (obj.mask) {
      return (
        <>
          <div key={obj.label} className={`input ${obj.className ?? obj.label}`}>

          <label htmlFor={obj.label}>{obj.label}:</label>

          <Controller
            name={obj.label}
            control={controllerHooksForm}
            render={({ field: { onChange, value } }) => (
              <MaskedInput
                mask={obj.mask}
                name={obj.label}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        </>
      );
    } else {
      return obj.regex ? (
        <>
          <div
            key={obj.label}
            className={`input ${obj.className ?? obj.label}`}
          >
            <label htmlFor={obj.label}>{obj.label}:</label>
            <input
              id={obj.label}
              type={obj.inputType}
              {...register(`${obj.label}`, {
                pattern: {
                  value: obj.regex,
                  message: obj.message,
                },
              })}
            />
          </div>
          {errors[obj.label] && <p className="error">{errors.Email.message}</p>}
        </>
      ) : (
        <div key={obj.label} className={`input ${obj.className ?? obj.label}`}>
          <label htmlFor={obj.label}>{obj.label}:</label>
          <input
            id={obj.label}
            type={obj.inputType}
            {...register(`${obj.label}`)}
            required={obj.required ? true : false}
          />
        </div>
      );
    }
  };

  return (
    <>
      {arrElements.configArr.map((e) =>
        e.inputType === 'textarea' ? renderTextArea(e.label) : renderInput(e)
      )}
    </>
  );
}
