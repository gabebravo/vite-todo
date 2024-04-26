export interface Todo {
  name: string;
  avatar: string;
  done: boolean;
  task: string;
  createdAt: Date;
  id: string;
}

export interface Todos {
  todos: Todo[];
}
