export enum LISTEN_ACTIONS {
  EXISTING = "existingExam",
  STARTED = "examStarted",
  PAUSED = "examPaused",
  RESET = "examReset",
  TIMER_UPDATE = "examTimerUpdate",
  FINISHED = "examFinished",
}

export enum EMIT_EVENTS {
  JOIN = "joinExam",
  EXISTING = "existingExam",
  PAUSED = "pauseExam",
  TIMER = "examTimer",
  FINISHED = "examFinished",
  START = "createAndStartExam",
  RESTART = "restartExam",
  RESET = "resetExam",
}
