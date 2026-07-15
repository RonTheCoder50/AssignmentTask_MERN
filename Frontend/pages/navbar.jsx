import Button from "../components/button";
import { useContext } from "react";
import { TaskContext } from "./mainPage";

export default function Navbar({ toggle }) {
  const { theme, handleTheme } = useContext(TaskContext);

  return (
    <div
      className={`
        flex 
        flex-wrap 
        gap-2 
        justify-around 
        items-start 
        p-4 
        border-b 
        tracking-wide
        ${theme === "dark" ? "bg-slate-900 text-white" : "bg-white"}
      `}
    >
      <h1
        className="
          poppins-semibold 
          text-lg 
          sm:text-xl
        "
      >
        TaskManager
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            value={"Dashboard"}
            onSmash={() => toggle("dashboard")}
            color={"bg-sky-600 text-gray-100 hover:bg-sky-700"}
          />

          <Button
            value={"Add Task"}
            onSmash={() => toggle("form")}
            color={"bg-green-600 text-white hover:bg-green-700"}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            value={"History"}
            onSmash={() => toggle("history")}
            color={"bg-gray-600 text-white hover:bg-gray-700"}
          />

          <Button
            value={"Logout"}
            onSmash={() => toggle("logout")}
            color={"bg-red-600 text-white hover:bg-red-700"}
          />

          <Button
            value={theme === "light" ? "dark" : "light"}
            onSmash={() => handleTheme()}
            color={"text-white bg-slate-600 hover:bg-slate-700"}
          />
        </div>
      </div>
    </div>
  );
}
