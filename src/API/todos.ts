import axios from "axios";
import { BASE_URL } from "./url";

export interface Data {
  data: object;
  status: number;
}

interface Todos {
  postTodo: (todo: object) => void;
  getTodos: () => void;
  editTodo: (id: number, todo: object) => void;
  deleteTodo: (id: number) => void;
}

export const todos: Todos = {
  postTodo: (todo: object) => axios.post(BASE_URL + `todos`, todo),
  getTodos: () => axios.get<Data[]>(BASE_URL + "todos"),
  editTodo: (id: number, todo: object) =>
    axios.put<Data[]>(BASE_URL + `todos/${id}`, todo),
  deleteTodo: (id: number) => axios.delete(BASE_URL + `todos/${id}`),
};
