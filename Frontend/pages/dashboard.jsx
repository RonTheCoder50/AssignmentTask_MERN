import CardBanner from "../components/task-banner";
import { useContext } from "react";
import { TaskContext } from "./mainPage";

export default function Dashboard() {
  const { data } = useContext(TaskContext);

  return (
    <div
      className={`
        flex 
        flex-col 
        items-center 
        gap-4 
        mt-6 
        mb-4 
        overflow-auto
        
      `}
    >
      {!data && (
        <p className="text-base sm:text-xl text-center mt-20 poppins-regular">
          No Tasks Found
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-base sm:text-xl text-center mt-20 poppins-regular">
          No Tasks Found
        </p>
      )}

      {data?.map((task) => {
        if (!task?.completed) {
          return <CardBanner key={task?._id} data={task} />;
        }
      })}
    </div>
  );
}
