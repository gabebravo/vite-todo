import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import { fetchTodo } from '../../data';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import React from 'react';
import { TodoView } from './TodoView';

export const TodoController: React.FC = () => {
  const { id } = useParams();
  useQuery({
    queryKey: ['todos', id],
    queryFn: () => fetchTodo(id),
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

  if (!id) {
    return null;
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => {
            const { message } = error as Error;
            return toast.error(message, {
              toastId: 'error-boundary',
              position: 'bottom-left',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
              onClose: () => resetErrorBoundary(),
            });
          }}
          onReset={reset}
        >
          <React.Suspense fallback={<h3>Loading Todo...</h3>}>
            <TodoView id={id} />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
