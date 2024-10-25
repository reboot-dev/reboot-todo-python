import { FormEvent, useState } from "react";

type Deadline = "minute" | "hour" | "day";

const DEADLINES: Deadline[] = ["minute", "hour", "day"];

const InputContainer = ({
  handleSubmit,
}: {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    name: string,
    deadline: Date
  ) => void;
}) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState<Deadline>("minute");

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        let date = new Date();
        switch (deadline) {
          case "minute":
            date.setTime(date.getTime() + 60000);
            break;
          case "hour":
            date.setTime(date.getTime() + 3600000);
            break;
          case "day":
            date.setTime(date.getTime() + 86400000);
            break;
        }
        handleSubmit(e, name, date);
        setName("");
        setDeadline("minute");
      }}
    >
      <div className="flex flex-col">
        <label className="text-black">Enter your next todo:</label>
        <input
          className="p-1 rounded-sm"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          className="bg-green-100 rounded-lg hover:bg-green-200 p-1"
          onClick={() =>
            setDeadline((deadline) =>
              DEADLINES.indexOf(deadline) === 0
                ? DEADLINES[DEADLINES.length - 1]
                : DEADLINES[DEADLINES.indexOf(deadline) - 1]
            )
          }
          >
          {"<"}
        </button>
        <div className="justify-center">
        <div className="text-xs">Deadline:</div>
          {deadline}
        </div>
        <button
          type="button"
          className="bg-green-100 rounded-lg hover:bg-green-200 p-1"
          onClick={() =>
            setDeadline((deadline) =>
              DEADLINES.indexOf(deadline) === DEADLINES.length - 1
                ? DEADLINES[0]
                : DEADLINES[DEADLINES.indexOf(deadline) + 1]
            )
          }
        >
          {">"}
        </button>
        <button
          type="submit"
          className="bg-green-100 rounded-lg hover:bg-green-200 p-1 w-full"
        >
          Add todo
        </button>
      </div>
    </form>
  );
};

export default InputContainer;
