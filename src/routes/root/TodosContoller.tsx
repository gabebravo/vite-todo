import { QueryErrorResetBoundary, useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../data';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';
import React from 'react';
import { TodosView } from './TodosView';

export const TodosController: React.FC = () => {
  useQuery({
    queryKey: ['todos', fetchTodos],
    queryFn: () => fetchTodos(),
    refetchOnWindowFocus: false,
  });

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
          <React.Suspense fallback={<h3>Loading Todos...</h3>}>
            <TodosView />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
