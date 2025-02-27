export const getStateColor = (examState: TypeExamState) => {
  const STATE: Record<TypeExamState, string> = {
    running: "bg-green-600",
    paused: "bg-amber-500",
    finished: "bg-blue-600",
    ready: "bg-indigo-500",
    waiting: "bg-gray-400",
  };
  return STATE[examState];
};

export const formatTime = (seconds?: number) =>
  seconds != null
    ? `${Math.floor(seconds / 60)}:${(seconds % 60)
        .toString()
        .padStart(2, "0")}`
    : "--:--";
