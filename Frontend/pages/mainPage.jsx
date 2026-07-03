import { useState, useEffect } from "react";
import { apiCall } from "./API";

import Navbar from "./navbar";
import TaskForm from "../components/form";

import TaskCard from "../components/task-card";
import Dashboard from "./dashboard";
import HistoryPage from "./history";

import { removeTaskAPI } from "./API";

import { createContext } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

import toast from "react-hot-toast";

export default function MainSection() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("dashboard");
  const [seletedTaskId, setSelectedTaskId] = useState(null);

  let viewTask =
    seletedTaskId && data?.filter((task) => task._id === seletedTaskId);

  const cleanData = data?.filter((task) => task.completed === false);

  function handleStatus(val) {
    if (val.trim().toLowerCase() === status) return;
    setStatus(val);
  }

  function handleMarkDoneTask(id) {
    setData((prev) => prev.filter((task) => task._id != id));
  }

  function handleSelectTaskId(id) {
    setSelectedTaskId(id);
  }

  //delete
  async function handleDeleteTask(id) {
    const response = await removeTaskAPI(id);
    fetchData();
    console.log(response);
  }

  async function fetchData() {
    const response = await apiCall();
    if (!response) {
      console.log("no data found!");
      return;
    }

    setData(response);
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let component;

  if (status === "form") {
    component = <TaskForm />;
  } else if (status === "history") {
    component = <HistoryPage />;
  } else if (status === "view") {
    component = <TaskCard data={viewTask[0]} />;
  } else {
    component = <Dashboard />;
  }

  if (data === null) {
    toast.loading("Fetching data from server...");
    setTimeout(() => {
      toast.dismiss();
    }, 5000);
  }

  return (
    <section className="min-h-screen w-full flex flex-col gap-14">
      <Navbar
        value={status === 2 ? "Add Task" : "Dashboard"}
        toggle={handleStatus}
      />

      <TaskContext.Provider
        value={{
          data: cleanData,
          historyData: data,
          completeTask: handleMarkDoneTask,
          removeTask: handleDeleteTask,
          selectedTaskId: handleSelectTaskId,
          status: handleStatus,
          refresh: fetchData,
          statusValue: status,
          taskId: seletedTaskId,
        }}
      >
        {component}
      </TaskContext.Provider>
    </section>
  );
}
