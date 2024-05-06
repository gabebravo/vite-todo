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
      throw new Error('Could not find that data');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Could not fetch todos');
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
      throw new Error('Could not find that data');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Could not fetch todo');
  }
};

export const createTodo = async (task: string): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(`${TODOS_URL}`, {
      createdAt: new Date().toISOString(),
      task,
      done: false,
    });
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
      throw new Error('Could not create that todo');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Could not create that todo');
  }
};

export const deleteTodo = async (id: string | undefined): Promise<Todo> => {
  try {
    const response = await axios.delete<Todo>(`${TODOS_URL}/${id}`);
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
      throw new Error('Could not delete that todo');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Could not delete that todo');
  }
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await axios.put<Todo>(`${TODOS_URL}/${todo.id}`, todo);
    if (response && response.data) {
      const { data } = response;
      await new Promise((r) => setTimeout(r, 500));
      return data;
    } else {
      // Handle the case where response or response.data is undefined
      console.error('Response or response data is undefined');
      throw new Error('Could not delete that todo');
    }
  } catch (error) {
    // Handle the network error
    console.error('Network error:', error);
    throw new Error('Could not delete that todo');
  }
};
