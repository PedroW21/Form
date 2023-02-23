import { Controller } from 'react-hook-form';
import { MaskedInputOptions } from '../Types';
import MaskedInput from 'react-input-mask';

const MaskedInputType = (MaskedInputProps: MaskedInputOptions) => {
  const { input, errors, controllerHooksForm, options } = MaskedInputProps;

  return (
    <>
      <div key={input.label} className={`input ${input.label}`}>
        <label htmlFor={input.label}>{input.label}:</label>

        <Controller
          name={input.label}
          control={controllerHooksForm}
          render={({ field: { onChange, onBlur } }) => (
            <MaskedInput
              mask={input.mask || ''}
              name={input.label}
              onChange={onChange}
              onBlur={onBlur}
              maskChar={''}
            />
          )}
          rules={options}
        />
      </div>
      {errors[input.label]?.message && <p className="error">{input.message}</p>}
    </>
  );
};

export default MaskedInputType;
