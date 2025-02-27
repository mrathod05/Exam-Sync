type TypeExamState = "waiting" | "ready" | "running" | "paused" | "finished";

type ExamRoomDto = {
  examId: string;
  duration: number;
  timeLeft: number;
  isRunning: boolean;
  subject: string;
  isFinished: boolean;
};
