import { Timestamp } from "@bufbuild/protobuf";
import { FormEvent } from "react";
import Container from "./components/Container";
import Input from "./components/Input";
import Summary from "./components/Summary/Summary";
import Todos from "./components/Todos/Todos";
import { ListResponse, useTodoList, } from "../../api/todos/v1/todos_rbt_react"

const TODO_LIST_ID = "todos";

function App() {
  const todoList = useTodoList({ id: TODO_LIST_ID });

  let { response } = todoList.useList();

  if (response === undefined) {
    response = new ListResponse({ details: {} });
  }

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    name: string,
    deadline: Date
  ) => {
    e.preventDefault();
    todoList.add({ details: { name, deadline: Timestamp.fromDate(deadline) } });
  };

  const handleDelete = (todoId: string) => {
    todoList.remove({ todoId });
  };

  const handleDeleteAll = () => {
    for (const [todoId, _] of Object.entries(response.details)) {
      todoList.remove({ todoId });
    }
  };

  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col items-center">
        <div className="bg-white rounded p-10 flex flex-col gap-10 sm:w-[640px]">
          <h1 className="text-xl font-semibold">Reboot TODO List</h1>
          <Container title={"Summary"}>
            <Summary details={response.details} />
          </Container>
          <Container>
            <Input handleSubmit={handleSubmit} />
          </Container>
          <Container title={"Todos"}>
            <div className="flex justify-center space-x-4 pb-4">
              <button
                className="bg-red-200 hover:bg-red-300 rounded-lg p-1 px-3"
                type="button"
                onClick={handleDeleteAll}
              >
                Delete all
              </button>
            </div>
            <Todos
              details={response.details}
              handleDelete={handleDelete}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default App;
