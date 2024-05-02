import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodo } from '../../data';
import { Todo } from '../../types';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

const linkStyles = css`
  position: absolute;
  top: 50px;
  left: 50px;
  span {
    font-size: 1.1rem;
  }
`;

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
      <span css={linkStyles}>
        <Link to="/">
          <span>&#8592;</span> Back
        </Link>
      </span>
      <h2>Todo Detail</h2>
      <p>{data.task}</p>
      <p>{data.done}</p>
    </div>
  ) : null;
};
