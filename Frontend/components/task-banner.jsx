import Button from "./button";
import { completeTaskAPI } from "../pages/API";

import { useContext } from "react";
import { TaskContext } from "../pages/mainPage";

export default function CardBanner({ data }) {
  const { completeTask, selectedTaskId, status, statusValue } =
    useContext(TaskContext);

  let d = new Date(data?.createdAt);
  const date = d.toISOString().split("T");

  async function markDoneTask() {
    const id = data?._id;

    if (!id) {
      return;
    }

    const task = {
      completed: true,
      content: data?.content,
      title: data?.title,
    };

    const response = await completeTaskAPI(task, id);
    console.log(response);
  }

  //list all completed tasks as history
  if (statusValue === "history") {
    return (
      <div className="w-full max-w-[90%] md:max-w-[740px] flex flex-col gap-2 p-2 rounded-md border">
        <h2 className="text-base font-normal poppins-regular">{data?.title}</h2>

        <p className="text-xs poppins-light line-clamp-1">
          {data?.content || "no content found"}
        </p>

        <hr />

        <div className="flex flex-wrap gap-1 justify-between items-center p-1">
          <div className="flex items-center gap-1 text-xs sm:text-sm  poppins-light sm:poppins-regular">
            <span>created: </span>
            <p>{date[0] + " | " + date[1].substring(0, 8)}</p>
          </div>

          <p className="text-base line-through text-gray-500">Completed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[90%] md:max-w-[740px] flex flex-col gap-2 p-2 rounded-md border">
      <h2 className="text-base font-medium poppins-semi-bold">{data?.title}</h2>

      <hr />

      <div className="flex flex-wrap gap-1 justify-between items-center p-1">
        <div className="flex items-center gap-1 text-xs sm:text-sm  poppins-light sm:poppins-regular">
          <span>created: </span>
          <p>{date[0] + " | " + date[1].substring(0, 8)}</p>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <Button
            onSmash={() => {
              markDoneTask();
              completeTask(data._id);
            }}
            value={"Incomplete"}
            color={"bg-blue-500 text-white hover:bg-blue-600"}
          />
          <Button
            onSmash={() => {
              selectedTaskId(data._id);
              status("view");
            }}
            value={"View"}
            color={"bg-green-500 text-white hover:bg-green-600"}
          />
        </div>
      </div>
    </div>
  );
}
