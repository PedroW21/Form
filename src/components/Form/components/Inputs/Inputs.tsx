import './Inputs.css';
import { InputsProps, inputAttributes } from './Types';
import MaskedInputType from './MaskedInputType/MaskedInputType';
import CheckboxInputType from './CheckBoxInputType/CheckboxInputType';
import GenericInputType from './GenericInputType/GenericInputType';

export default function Inputs(arrElements: InputsProps) {
  const { configArr, register, errors, controllerHooksForm } = arrElements;

  const renderTextArea = (label: string) => (
    <div key={label} className={`input ${label}`}>
      <label htmlFor={label}>Text:</label>
      <textarea id={label}></textarea>
    </div>
  );

  const renderMaskedInputs = (input: inputAttributes) => {
    if (!input.regex || !input.message) return;

    const options = {
      pattern: {
        value: input.regex,
        message: input.message,
      },
    };

    return (
      <MaskedInputType
        input={input}
        errors={errors}
        options={options}
        controllerHooksForm={controllerHooksForm}
        classname={input.label}
      />
    );
  };

  const renderCheckboxInput = (input: inputAttributes) => {
    return (
      <CheckboxInputType
        input={input}
        classname={input.label}
        register={register}
        errors={errors}
      />
    );
  };

  const renderGenericInput = (input: inputAttributes) => {
    const classname = 'input ' + input.className;

    const options = {
      pattern: {
        value: input.regex || new RegExp(''),
        message: input.message || ''
      }
    };

    return (
      <GenericInputType
        input={input}
        classname={classname}
        errors={errors}
        register={register}
        options={options}
      />
    );
  };

  const renderInputs = (inputs: inputAttributes[]) => {
    return inputs.map((input) => {
      if (input.inputType === 'textarea') return renderTextArea(input.label);

      if (input.inputType === 'checkbox') return renderCheckboxInput(input);

      if (input.mask) return renderMaskedInputs(input);

      return renderGenericInput(input);
    });
  };

  return <>{renderInputs(configArr)}</>;
}
