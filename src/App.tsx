import { Link, Route, Routes } from 'react-router-dom';
import './css/App.css';
import { FC } from 'react';
import { TodosController } from './routes/root/TodosContoller';
import { TodoController } from './routes/todo/TodoController';
import { ToggleSwitch } from './components/ToggleSwitch';

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
  <div>
    <ToggleSwitch />
    <Routes>
      <Route path="/" element={<TodosController />}>
        {/* Using path="*"" means "match anything", so this route
        acts like a catch-all for URLs that we don't have explicit
      routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/todo/:id" element={<TodoController />} />
    </Routes>
  </div>
);
