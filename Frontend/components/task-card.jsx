import Button from "./button";

import { useContext } from "react";
import { TaskContext } from "../pages/mainPage";

export default function TaskCard({ data }) {
  const createdAt = data?.createdAt?.split("T");
  const updatedAt = data?.updatedAt?.split("T");

  const { status, removeTask } = useContext(TaskContext);

  return (
    <div className="w-full mx-auto max-w-[400px] sm:max-w-[650px] flex flex-col gap-4 p-2 rounded-md shadow-sm border border-gray-400">
      <h2 className="text-xl font-medium poppins-semi-bold p-1">
        {data?.title || "not found"}
      </h2>

      <hr className="border-gray-400" />

      <p className="text-sm sm:text-base poppins-regular p-1">
        {data ? data?.content : "not found"}
      </p>

      <div className="flex flex-col items-end justify-start gap-0 text-sm mt-4">
        <div className="flex items-center gap-1 text-xs sm:text-sm  poppins-light">
          <span>created: </span>
          <p>
            {createdAt
              ? createdAt[0] + " | " + createdAt[1].substring(0, 8)
              : "undefined"}
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs sm:text-sm  poppins-light">
          <span>last update: </span>
          <p>
            {updatedAt
              ? updatedAt[0] + " | " + updatedAt[1].substring(0, 8)
              : "undefined"}
          </p>
        </div>
      </div>

      <hr className="border-gray-400" />

      <div className="flex gap-2 items-center justify-end">
        <Button
          onSmash={() => {
            localStorage.setItem("udata", JSON.stringify(data));
            status("form");
          }}
          value={"Update"}
          color={"bg-green-500 text-white hover:bg-green-600"}
        />
        <Button
          onSmash={() => {
            if (confirm("Are you sure that u want to remove this task?")) {
              removeTask(data?._id);
              status("dashboard");
            }
          }}
          value={"Delete"}
          color={"bg-red-500 text-white hover:bg-red-600"}
        />
        <Button
          onSmash={() => status("dashboard")}
          value={"Close"}
          color={"bg-pink-500 text-white hover:bg-pink-600"}
        />
      </div>
    </div>
  );
}
