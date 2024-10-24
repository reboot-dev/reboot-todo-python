import { TodoDetails, useTodo } from "../../../../api/todos/v1/todos_rbt_react"

const TodoItem = ({
  id,
  details,
  handleDelete,
}: {
  id: string;
  details: { [key: string]: TodoDetails };
  handleDelete: (todoId: string) => void;
}) => {
  const todo = useTodo({ id });

  return (
    <div className={`flex justify-between bg-white p-1 px-3 rounded-sm gap-4 ${details.warned && 'bg-red-200'}`}>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={details.done}
          onChange={() => todo.complete()}
        />
        {details.name}
      </div>
      {details.warned && <span className="text-red-500">Warned!</span>}
      <button
        className="bg-green-200 hover:bg-green-300 rounded-lg p-1 px-3"
        type="button"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
