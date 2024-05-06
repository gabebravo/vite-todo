import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createTodo } from '../data/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

type Inputs = {
  todo: string;
};

export const TodoTextField: FC = () => {
  const [isCreateLoading, setIsCreateLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (task: string) => createTodo(task),
    onSuccess: async () => {
      setIsCreateLoading(false);
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsCreateLoading(true);
    createMutation.mutate(data.todo);
    reset();
  };

  if (createMutation.error) {
    throw createMutation.error;
  }

  if (isCreateLoading) {
    return <i className="fa fa-refresh fa-spin"></i>;
  }

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
