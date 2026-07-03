import { useState } from "react";
import Button from "./button";

import { addTaskAPI, updateTaskAPI } from "../pages/API";

import { useContext } from "react";
import { TaskContext } from "../pages/mainPage";

import toast from "react-hot-toast";

export default function TaskForm() {
  const data = JSON.parse(localStorage.getItem("udata"));
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    title: data?.title || "",
    content: data?.content || "",
    id: data?._id || null,
  });

  const { status, refresh } = useContext(TaskContext);

  function handleTitle(e) {
    const val = e.target.value;
    setInfo({
      ...info,
      title: val,
    });
  }

  function handleContent(e) {
    const val = e.target.value;
    setInfo({
      ...info,
      content: val,
    });
  }

  async function handleSubmit() {
    if (info.title.trim().length === 0) {
      toast.error("Enter task!");
      return;
    }

    if (info.content.trim().length === 0) {
      toast.error("Enter content");
      return;
    }

    setLoading(true);

    if (!data) {
      //task needs to add.
      const response = await addTaskAPI(info);
      console.log(response);
    } else {
      //update task call
      const response = await updateTaskAPI(info);
      console.log(response);

      localStorage.removeItem("udata");
    }

    refresh();
    setLoading(false);
    status("dashboard");
    setLoading({
      title: "",
      content: "",
      id: null,
    });
  }

  return (
    <div className="w-full max-w-[90%] sm:max-w-[550px] mx-auto flex flex-col gap-5 p-5 poppins-regular rounded-sm shadow-sm border border-gray-400">
      <h2 className="border-b text-xl border-gray-400">Task Form</h2>

      <label className="flex flex-col gap-1">
        <span className="text-lg">Title</span>
        <input
          type="text"
          value={info.title}
          onChange={handleTitle}
          className="border border-gray-400 rounded-sm p-2 poppins-light"
          placeholder="Enter task title"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-lg">Content</span>
        <textarea
          style={{ height: "140px" }}
          value={info.content}
          onChange={handleContent}
          className="border border-gray-400 rounded-sm px-2 py-1 poppins-light"
          placeholder="Enter task description"
        />
      </label>

      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          disabled={loading}
          value={loading ? "Submiting..." : "Submit"}
          onSmash={() => handleSubmit()}
          color={
            loading
              ? "bg-gray-500 text-gray-100 pointer-events-none"
              : "bg-green-500 text-white hover:bg-green-600"
          }
        />
        <Button
          value={"Cancel"}
          onSmash={() => status("dashboard")}
          color={"bg-red-500 text-white hover:bg-red-600"}
        />
      </div>
    </div>
  );
}
