import axios from 'axios';
import { Todos } from '../types';

const TODOS_URL = `https://${import.meta.env.VITE_API_KEY}.mockapi.io/todo`;

export const fetchTodos = async () => {
  try {
    const response = await axios.get<Todos>(TODOS_URL);
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
  }
};
