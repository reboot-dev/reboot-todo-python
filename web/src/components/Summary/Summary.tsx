import { TodoDetails } from "../../../../api/todos/v1/todos_rbt_react";
import SummaryItem from "./SummaryItem";

const Summary = ({ details }: { details: { [key: string]: TodoDetails } }) => {
  const { pending, done } = Object.entries(details).reduce(
    ({ pending, done }, [_, details]) => {
      if (details.done) return { pending, done: done + 1 };
      else return { pending: pending + 1, done };
    },
    { pending: 0, done: 0 }
  );

  return (
    <>
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
        <SummaryItem itemName={"Total"} itemValue={pending + done} />
        <SummaryItem itemName={"To do"} itemValue={pending} />
        <SummaryItem itemName={"Done"} itemValue={done} />
      </div>
    </>
  );
};

export default Summary;
