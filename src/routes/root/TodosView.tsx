import React from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../data';
import { Todo } from '../../types';
import { Link } from 'react-router-dom';
import { deleteTodo, updateTodo } from '../../data/todos';
import { css } from '@emotion/react';
import { TodoTextField } from '../../components/TodoTextField';

const rootStyles = css`
  display: flex;
  width: 350px;
  justify-content: space-between;
  margin: 10px 0px;
`;

const actionsSectionStyles = css`
  display: flex;
  width: 85px;
  justify-content: space-between;
  div > i {
    font-size: 24px;
  }
`;

export const TodosView: React.FC = () => {
  const [deleteLoadingId, setdeleteLoadingId] = React.useState('');
  const [updateLoadingId, setUpdateLoadingId] = React.useState('');

  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery<Todo[]>({
    queryKey: ['todos', fetchTodos],
    queryFn: () => fetchTodos() as unknown as Promise<Todo[]>,
    refetchOnWindowFocus: false,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteHandler = (id: string): void => {
    setdeleteLoadingId(id);
    deleteMutation.mutate(id);
  };

  if (deleteMutation.error) {
    throw deleteMutation.error;
  }

  const updateMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateHandler = (todo: Todo): void => {
    setUpdateLoadingId(todo.id);
    updateMutation.mutate(todo);
  };

  if (updateMutation.error) {
    throw updateMutation.error;
  }

  return data ? (
    <>
      <h3>Todos</h3>
      <TodoTextField />
      <ol>
        {data.map((todo: Todo) => (
          <li key={todo.id}>
            <div css={rootStyles}>
              {' '}
              <Link to={`/todo/${todo.id}`}>
                <div>{todo.task}</div>
              </Link>
              <div css={actionsSectionStyles}>
                <div onClick={() => deleteHandler(todo.id)}>
                  <i
                    className={
                      deleteMutation.isPending && deleteLoadingId === todo.id
                        ? 'fa fa-refresh fa-spin'
                        : 'fa fa-trash-o'
                    }
                  ></i>
                </div>
                <div onClick={() => updateHandler({ ...todo, done: !todo.done })}>
                  <i
                    className={
                      updateMutation.isPending && updateLoadingId === todo.id
                        ? 'fa fa-refresh fa-spin'
                        : todo.done
                          ? 'fa fa-check'
                          : 'fa fa-square-o'
                    }
                  ></i>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  ) : null;
};
