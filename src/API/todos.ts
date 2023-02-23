import axios from "axios";
import { BASE_URL } from "./url";
import { Todos, Data } from "../types/types";

export const todos: Todos = {
  postTodo: (todo: object) => axios.post<Data>(BASE_URL + `todos`, todo),
  getTodos: () => axios.get<Data>(BASE_URL + "todos"),
  editTodo: (id: number, todo: object) =>
    axios.put<Data>(BASE_URL + `todos/${id}`, todo),
  deleteTodo: (id: number) => axios.delete(BASE_URL + `todos/${id}`),
};
