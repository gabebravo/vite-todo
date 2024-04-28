import axios from 'axios';
import { Todo } from '../types';

const TODOS_URL = `https://${import.meta.env.VITE_API_KEY}.mockapi.io/todos`;

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(TODOS_URL);
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
      throw new Error('Coult not find that data');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Coult not fetch todos');
  }
};

export const fetchTodo = async (id: string | undefined): Promise<Todo> => {
  try {
    const response = await axios.get<Todo>(`${TODOS_URL}/${id}`);
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
      throw new Error('Coult not find that data');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Coult not fetch todo');
  }
};
