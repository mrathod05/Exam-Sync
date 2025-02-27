"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { initialExamRoom } from "../constants";
import { EMIT_EVENTS, LISTEN_ACTIONS } from "../constants/enums";
import { getStateColor } from "../utils";
import useExamState from "../hooks/useExamState";
import TimerProgress from "../components/TimeProgress";
import ExamCompleted from "../components/ExamCompleted";

const Student = () => {
  const { examState, handleExamState } = useExamState();
  const socketRef = useRef<Socket | null>(null);

  const [{ examId, duration, subject, timeLeft, isFinished }, setExamData] =
    useState<ExamRoomDto>(initialExamRoom);
  const [hasJoined, setHasJoined] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleExamData = (data: Partial<ExamRoomDto>) => {
    console.log({ data });
    setExamData((prev) => ({ ...prev, ...data }));

    if (data.isRunning) {
      handleExamState("running");
      setStatusMessage("Exam is in progress");
    } else if (data.isRunning === false) {
      handleExamState("paused");
      setStatusMessage("Exam is paused by examiner");
    }

    if (data.isFinished) {
      handleExamState("finished");
      setStatusMessage("You have completed the exam!");
    }
  };

  const eventHandlers = {
    [LISTEN_ACTIONS.EXISTING]: (data: Partial<ExamRoomDto>) => {
      handleExamData(data);
      if (data.examId && !data.isFinished) {
        handleExamState("ready");
        setStatusMessage("Exam found! Waiting for examiner to start");
      }
    },
    [LISTEN_ACTIONS.TIMER_UPDATE]: handleExamData,
    [LISTEN_ACTIONS.STARTED]: (data: Partial<ExamRoomDto>) => {
      handleExamState("running");
      handleExamData(data);
      setStatusMessage("Exam has started!");
    },
    [LISTEN_ACTIONS.PAUSED]: (data: Partial<ExamRoomDto>) => {
      handleExamData(data);
      handleExamState("paused");
      setStatusMessage("Exam has been paused");
    },
    [LISTEN_ACTIONS.RESET]: (data: Partial<ExamRoomDto>) => {
      handleExamData(data);
      setHasJoined(false);
      handleExamState("waiting");
      setStatusMessage("Exam has been reset. Please rejoin when ready.");
    },
    [LISTEN_ACTIONS.FINISHED]: (data: Partial<ExamRoomDto>) => {
      handleExamData(data);
      console.log("finished");
      handleExamState("finished");
      setStatusMessage("Exam completed! Thank you for your participation.");
    },
  };

  useEffect(() => {
    const socket = io("http://localhost:5001/exam");
    socketRef.current = socket;

    Object.entries(eventHandlers).forEach(([event, handler]) =>
      socket.on(event, handler)
    );

    return () => {
      Object.keys(eventHandlers).forEach((event) => socket.off(event));
      socket.disconnect();
    };
  }, []);

  console.log({ socketRef: socketRef.current });

  const joinExam = () => {
    if (!examId) {
      setStatusMessage("Please enter an Exam ID");
      return;
    }
    socketRef.current?.emit(EMIT_EVENTS.JOIN, { examId });
    setHasJoined(true);
    setStatusMessage("Connecting to exam session...");
    handleExamState("waiting");
  };

  const startNewExam = () => {
    setHasJoined(false);
    setExamData(initialExamRoom);
    handleExamState("waiting");
    setStatusMessage("");
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-100">
      {/* Header */}
      <div
        className={`rounded-t-xl p-6 -mx-8 -mt-8 mb-6 text-white transition-colors duration-500 ${getStateColor(
          examState
        )}`}
      >
        <h1 className="text-2xl font-bold text-center">
          {subject ? `${subject} Exam` : "Student Exam Portal"}
        </h1>
        {isFinished ? (
          <p className="text-center mt-2 opacity-90">Exam Finished</p>
        ) : (
          examState !== "waiting" &&
          subject && (
            <p className="text-center mt-2 opacity-90">
              {hasJoined
                ? `You've joined exam session: ${examId}`
                : "Please join an exam session"}
            </p>
          )
        )}
      </div>

      {/* Completed Exam UI */}
      {isFinished ? (
        <ExamCompleted onButtonClick={startNewExam} subject={subject} />
      ) : hasJoined ? (
        <>
          <div className="transition-all duration-500">
            <div className="mb-6 flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  examState === "running"
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-400"
                }`}
              />
              <span className="font-medium text-gray-800">{statusMessage}</span>
            </div>

            {/* Timer */}
            <TimerProgress duration={duration} timeLeft={timeLeft} />

            {/* Exam Info */}
            {subject && (
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm border-t pt-4">
                <div>
                  <span className="text-gray-500">Subject:</span>{" "}
                  <span className="font-medium">{subject}</span>
                </div>
                <div>
                  <span className="text-gray-500">Exam ID:</span>{" "}
                  <span className="font-medium">{examId}</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4 transition-all duration-300">
          <label
            htmlFor="examId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Exam ID
          </label>
          <input
            id="examId"
            type="text"
            value={examId}
            onChange={(e) =>
              setExamData((prev) => ({ ...prev, examId: e.target.value }))
            }
            disabled={hasJoined}
            placeholder="Enter Exam ID"
            className="w-full p-3 border rounded-lg focus:ring-2 disabled:bg-gray-100"
          />
          <button
            onClick={joinExam}
            disabled={hasJoined || !examId}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            Join Exam Session
          </button>
        </div>
      )}
    </div>
  );
};

export default Student;
