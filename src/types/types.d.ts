export interface Data {
  data: object;
  status: number;
}

interface Todos {
  postTodo: (todo: object) => Promise<Data>;
  getTodos: () => Promise<Data>;
  editTodo: (id: number, todo: object) => Promise<Data>;
  deleteTodo: (id: number) => Promise<Data>;
}

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}