import { TodoDetails } from "../../../../api/todos/v1/todos_rbt_react"
import TodoItem from "./TodoItem";

const Todos = ({
  details,
  handleDelete,
}: {
  details: { [key: string]: TodoDetails };
  handleDelete: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {Object.entries(details).length ? (
        Object.entries(details).map(([id, details]) => (
          <TodoItem
            key={id}
            id={id}
            details={details}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <span className="text-black">No todos yet!</span>
      )}
    </div>
  );
};

export default Todos;
