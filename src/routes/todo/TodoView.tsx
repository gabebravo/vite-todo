import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodo } from '../../data';
import { Todo } from '../../types';

type Props = {
  id: string | undefined;
};
export const TodoView: React.FC<Props> = ({ id }) => {
  const { data } = useSuspenseQuery<Todo>({
    queryKey: ['todos', id],
    queryFn: () => fetchTodo(id),
    refetchOnWindowFocus: false,
  });

  return data ? (
    <div>
      <h2>Todo Detail</h2>
      <p>{data.task}</p>
      <p>{data.done}</p>
    </div>
  ) : null;
};
