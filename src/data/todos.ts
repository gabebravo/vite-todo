import axios from 'axios';

const TODOS_URL = `https://${import.meta.env.VITE_API_KEY}.mockapi.io/todo`;

export async function fetchTodos() {
  const { data } = await axios.get(TODOS_URL);
  console.log('gb - data:', data);
  await new Promise((r) => setTimeout(r, 500));
  return data?.results;
}
