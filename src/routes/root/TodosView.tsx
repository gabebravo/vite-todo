import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../data';
import { Todo } from '../../types';
import { Link } from 'react-router-dom';

export const TodosView: React.FC = () => {
  const { data } = useSuspenseQuery<Todo[]>({
    queryKey: ['todos', fetchTodos],
    queryFn: () => fetchTodos() as unknown as Promise<Todo[]>,
    refetchOnWindowFocus: false,
  });

  return data ? (
    <>
      <h3>Todos</h3>
      <ul>
        {data.map((todo: Todo) => (
          <li key={todo.id}>
            <div className="sw-person-info">
              <div>
                {' '}
                <Link to={`/todo/${todo.id}`}>
                  <div>{todo.task}</div>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  ) : null;
};
