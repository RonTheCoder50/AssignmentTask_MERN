import CardBanner from "../components/task-banner";
import { useContext } from "react";
import { TaskContext } from "./mainPage";

export default function HistoryPage() {
  const { historyData } = useContext(TaskContext);

  return (
    <div className="flex flex-col items-center gap-4 mt-6 mb-4 overflow-auto">
      {historyData === null ||
        (historyData?.length === 0 && (
          <p className="text-base sm:text-xl text-center mt-20 poppins-regular">
            No History Found.
          </p>
        ))}
      {historyData?.map((task) => {
        if (task?.completed) {
          return <CardBanner key={task?._id} data={task} />;
        }
      })}
    </div>
  );
}
