/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
// import { Link } from 'react-router-dom';
// import { usePlanetUrlState } from '../homeplanet/state';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../data';
import { Todo, Todos } from '../../types';

export const TodosView: React.FC = () => {
  // const setPlanetUrl = usePlanetUrlState((state) => state.setUrl);

  const { data } = useSuspenseQuery<Todos>({
    queryKey: ['todos', fetchTodos],
    queryFn: () => fetchTodos() as Promise<Todos>,
    refetchOnWindowFocus: false,
  });

  // const addPlanetUrl = (homeworld: string) => {
  //   setPlanetUrl(homeworld);
  // };

  return data ? (
    <>
      <h3>Todos</h3>
      <ul>
        {data.todos.map((todo: Todo) => (
          <li key={todo.id}>
            <div className="sw-person-info">
              <div>{todo.task}</div>
              {/* <div>
                {' '}
                <Link onClick={() => addPlanetUrl(person.homeworld)} to="/homeplanet">
                  homeplanet info
                </Link>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  ) : null;
};
