import './Form.css';
import { SubmitHandler, useForm } from 'react-hook-form';

import Inputs from './components/Inputs';

const inputs = [
  { label: 'Integer', inputType: 'number' },
  { label: 'Double/Float', inputType: 'text', className: 'doubleFloat' },
  { label: 'String', inputType: 'text' },
  { label: 'Date', inputType: 'date' },
  { label: 'Time', inputType: 'time' },
  { label: 'Boolean', inputType: 'checkbox' },
  {
    label: 'Email',
    inputType: 'text',
    maxLength: 100,
    regex: /\w+@[a-zA-Z]+\.com(?:\.br)?/gm,
    message: 'Email inválido',
  },
  { label: 'Url', inputType: 'url', required: true },
  {
    label: 'CPF',
    inputType: 'text',
    mask: '999.999.999-99',
    regex: /\d{3}\.\d{3}\.\d{3}-\d{2}/gm,
    message: 'CPF inválido!',
  },
  {
    label: 'CNPJ',
    inputType: 'text',
    mask: '99.999.999/9999-99',
    regex: /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/gm,
    message: 'CNPJ inválido!',
  },
  {
    label: 'Inscrição Estadual',
    inputType: 'number',
    className: 'inscricaoEstadual',
  },
  { label: 'Text', inputType: 'textarea' },
];

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  return (
    <div className="form__container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Inputs
          configArr={inputs}
          register={register}
          errors={errors}
          controllerHooksForm={control}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
