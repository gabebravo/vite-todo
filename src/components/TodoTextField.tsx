import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  todo: string;
};

export const TodoTextField: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  console.log(watch('todo')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register('todo', { pattern: /^([^0-9]*)$/ })} />
      {/* errors will return when field validation fails  */}
      {errors.todo && <div>Numbers are not allowed</div>}

      <input type="submit" />
    </form>
  );
};
