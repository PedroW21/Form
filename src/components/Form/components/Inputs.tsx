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
  step?: number;
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

  const renderMaskedInputs = ({
    regex = new RegExp(''),
    message = '',
    ...obj
  }: configObj) => (
    <>
      <div key={obj.label} className={`input ${obj.className ?? obj.label}`}>
        <label htmlFor={obj.label}>{obj.label}:</label>

        <Controller
          name={obj.label}
          control={controllerHooksForm}
          render={({ field: { onChange, onBlur } }) => (
            <MaskedInput
              mask={obj.mask || ''}
              name={obj.label}
              onChange={onChange}
              onBlur={onBlur}
              maskChar={''}
            />
          )}
          rules={{
            pattern: {
              value: regex,
              message: message,
            },
          }}
        />
      </div>
      {errors[obj.label]?.message && <p className="error">{message}</p>}
    </>
  );

  const renderInputs = ({
    regex = new RegExp(''),
    message = '',
    ...obj
  }: configObj) => {
    return (
      <>
        <div key={obj.label} className={`input ${obj.className ?? obj.label}`}>
          {obj.inputType === 'checkbox' ? (
            <>
              <span>{obj.label}:</span>
              <label htmlFor={obj.label} className="switch">
                <input
                  id={obj.label}
                  type={obj.inputType}
                  maxLength={obj.maxLength}
                  {...register(`${obj.label}`, {
                    pattern: {
                      value: regex,
                      message: message,
                    },
                  })}
                  required={obj.required}
                />
                <span className="slider round"></span>
              </label>
            </>
          ) : (
            <>
              <label htmlFor={obj.label}>{obj.label}:</label>
              <input
                id={obj.label}
                type={obj.inputType}
                maxLength={obj.maxLength}
                step={obj.step}
                {...register(`${obj.label}`, {
                  pattern: {
                    value: regex,
                    message: message,
                  },
                })}
                required={obj.required}
              />
            </>
          )}
        </div>
        {errors[obj.label]?.message && <p className="error">{message}</p>}
      </>
    );
  };

  return (
    <>
      {arrElements.configArr.map((e) => {
        if (e.inputType === 'textarea') return renderTextArea(e.label);

        if (e.mask)
          return renderMaskedInputs(e);

        return renderInputs(e);
      })}
    </>
  );
}
