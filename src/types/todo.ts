export interface Todo {
  todos: TodosData[];
  total: number;
  skip: number;
  limit: number;
}

export interface TodosData {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
export interface AddTodo {
  todo: string;
  completed: boolean;
  userId: number;
}
export interface UpdateTodo {
  id: number;
  todo?: string;
  completed?: boolean;
  userId?: number;
}
