import { useSelector } from "react-redux";
import { selectActiveChannel } from "./channelSlice";

export const ChannelHeader = () => {
  const activeChannel = useSelector(selectActiveChannel);

  return (
    <div className="border-b p-4 dark:border-gray-700">
      <div className="flex items-center min-h-8">
        <h2 className=" font-bold capitalize">
          {activeChannel ? activeChannel?.name : null || "Выберите канал"}
        </h2>
      </div>
    </div>
  );
};
