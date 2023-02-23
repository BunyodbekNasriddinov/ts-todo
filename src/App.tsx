import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { Data, todos } from "./API/todos";

function App() {
  interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
  }
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const initialValues = {
    text: "",
    isCompleted: false,
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("Please enter a todo..."),
  });

  const getTodos = async () => {
    const data: any = await todos.getTodos();
    setTodoList(data.data);
  };

  const handleSubmit = async (values: object) => {
    const data = await todos.postTodo(values);
    if (data.status === 201) {
      toast.success("Successfully todo add...");
      console.log(data);
      getTodos();
    }
    values.text = "";
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = async (evt: any) => {
    const id: number = +evt.target.dataset.todoId;
    const todo: Todo = {
      id: id,
      text: todoList[id - 1].text,
      isCompleted: !todoList[id - 1].isCompleted,
    };

    const data = await todos.editTodo(id, todo);

    if (data.status === 200) {
      toast.success("Todo successfully changes");
      getTodos();
    }
  };

  const handleEdit = async (evt: any) => {
    const id: number = +evt.target.dataset.todoId;
    const newTodo: any = prompt("Please edit a todo...", todoList[id - 1].text);
    const todo: Todo = {
      id: id,
      text: newTodo,
      isCompleted: todoList[id - 1].isCompleted,
    };

    if (newTodo) {
      const data = await todos.editTodo(id, todo);

      if (data.status === 200) {
        toast.success("Todo successfully edit");
        getTodos();
      }
    }
  };

  const handleDelete = async (evt: any) => {
    const id: number = +evt.target.dataset.todoId;
    const data = await todos.deleteTodo(id);
    if (data.status) {
      toast.error("Deleted todo");
      getTodos();
    }
  };

  return (
    <div className="container p-5">
      <h1 className="text-center display-2 my-5 text-primary">TODO TS APP</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="p-5 shadow rounded">
          <div className="input-group">
            <Field className="form-control" type="text" name="text" />
            <button className="btn btn-primary" type="submit">
              SEND
            </button>
          </div>
        </Form>
      </Formik>
      {todoList.length ? (
        <ul className="list-group my-5">
          {todoList.map((todo: Todo) => (
            <li
              className={`list-group-item d-flex align-items-center ${
                todo.isCompleted ? "text-decoration-line-through text-success" : ""
              }`}
              key={todo.id}
            >
              <input
                onChange={(evt: any) => handleChange(evt)}
                className="form-check-input me-3"
                checked={todo.isCompleted}
                type="checkbox"
                data-todo-id={todo.id}
              />
              <span>
                {todo.id}. {todo.text}
              </span>
              <button
                onClick={(evt: any) => handleEdit(evt)}
                className="btn btn-warning ms-auto"
                data-todo-id={todo.id}
              >
                EDIT
              </button>
              <button
                onClick={(evt: any) => handleDelete(evt)}
                className="btn btn-danger ms-3"
                data-todo-id={todo.id}
              >
                DELETE
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-center my-5 display-3 text-success">
          Todos are not available
        </h2>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
