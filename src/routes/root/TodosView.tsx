import React from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../data';
import { Todo } from '../../types';
import { Link } from 'react-router-dom';
import { deleteTodo } from '../../data/todos';

export const TodosView: React.FC = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const { data } = useSuspenseQuery<Todo[]>({
    queryKey: ['todos', fetchTodos],
    queryFn: () => fetchTodos() as unknown as Promise<Todo[]>,
    refetchOnWindowFocus: false,
  });

  const deleteHandler = (id: string): void => {
    mutation.mutate(id);
  };

  return data ? (
    <>
      <h3>Todos</h3>
      <ol>
        {data.map((todo: Todo) => (
          <li key={todo.id}>
            <div
              style={{
                display: 'flex',
                width: 350,
                justifyContent: 'space-between',
                margin: '10px 0px',
              }}
            >
              {' '}
              <Link to={`/todo/${todo.id}`}>
                <div>{todo.task}</div>
              </Link>
              <div
                style={{
                  display: 'flex',
                  width: 85,
                  justifyContent: 'space-between',
                }}
              >
                <div onClick={() => deleteHandler(todo.id)}>
                  <i className="fa fa-trash-o" style={{ fontSize: 24 }}></i>
                </div>
                <div>
                  <i className="fa fa-square-o" style={{ fontSize: 24 }}></i>
                </div>
                <div>
                  <i className="fa fa-check" style={{ fontSize: 24 }}></i>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  ) : null;
};
