import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { FC } from 'react';
import { TodosController } from './routes/root/TodosContoller';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go back to the home page</Link>
      </p>
    </div>
  );
}

export const App: FC = () => (
  <Routes>
    <Route path="/" element={<TodosController />}>
      {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
      routes for. */}
      <Route path="*" element={<NoMatch />} />
    </Route>
    {/* <Route path="todo" element={<Todo />} /> */}
  </Routes>
);
