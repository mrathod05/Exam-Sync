import { formatTime } from "../utils";

type Props = Pick<ExamRoomDto, "duration" | "timeLeft">;

const TimerProgress = ({ timeLeft, duration }: Props) => {
  const progressPercentage =
    timeLeft && duration ? (timeLeft / duration) * 100 : 0;

  return (
    <div className="bg-gray-50 rounded-lg border p-4">
      <h2 className="font-semibold text-gray-800 mb-3">Exam Timer</h2>
      <div className="text-center text-3xl font-bold font-mono">
        {formatTime(timeLeft)}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
        <div
          className="h-3 rounded-full transition-all duration-500 bg-green-600"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TimerProgress;
