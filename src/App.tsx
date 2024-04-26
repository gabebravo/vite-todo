import './App.css';
import { fetchTodos } from './data';

function App() {
  const data = fetchTodos();
  console.log('gb - data:', data);

  return (
    <>
      <div>
        <h1>Hello World</h1>
      </div>
    </>
  );
}

export default App;
