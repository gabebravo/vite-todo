import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodo } from '../../data';
import { Todo } from '../../types';
import { Link } from 'react-router-dom';

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
      <span style={{ position: 'absolute', top: 50, left: 50 }}>
        <Link to="/">
          <span style={{ fontSize: '1rem' }}>&#8592;</span> Back
        </Link>
      </span>
      <h2>Todo Detail</h2>
      <p>{data.task}</p>
      <p>{data.done}</p>
    </div>
  ) : null;
};
