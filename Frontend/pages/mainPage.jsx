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
import { useNavigate } from "react-router-dom";

export default function MainSection() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("dashboard");
  const [seletedTaskId, setSelectedTaskId] = useState(null);

  let viewTask =
    seletedTaskId && data?.filter((task) => task._id === seletedTaskId);

  const cleanData = data?.filter((task) => task.completed === false);

  const navigate = useNavigate();

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

  //fetch data
  async function fetchData() {
    const response = await apiCall();
    if (!response) {
      console.log("no data found!");
      return;
    }

    setData(response);
    console.log(response);
  }

  //handle logout
  function handleLogout() {
    if (confirm("Do you want to logout ?")) {
      localStorage.clear();
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  let component;

  switch (status) {
    case "form":
      component = <TaskForm />;
      break;
    case "history":
      component = <HistoryPage />;
      break;
    case "view":
      component = <TaskCard data={viewTask[0]} />;
      break;
    case "logout":
      handleLogout();
      break;
    default:
      component = <Dashboard />;
      break;
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
