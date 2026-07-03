import Button from "../components/button";

export default function Navbar({ value, toggle }) {
  return (
    <div className="flex flex-wrap gap-2 justify-around items-center p-4 border-b tracking-wide">
      <h1
        className="
          poppins-semibold 
          text-lg 
          sm:text-xl
        "
      >
        TaskManager
      </h1>

      <div className="flex items-center gap-4">
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

        <Button
          value={"History"}
          onSmash={() => toggle("history")}
          color={"bg-gray-600 text-white hover:bg-gray-700"}
        />
      </div>
    </div>
  );
}
