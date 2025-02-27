"use client";

import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { initialExamRoom } from "../constants";
import { EMIT_EVENTS, LISTEN_ACTIONS } from "../constants/enums";
import { getStateColor } from "../utils";
import useExamState from "../hooks/useExamState";
import TimerProgress from "../components/TimeProgress";
import ExamCompleted from "../components/ExamCompleted";
import { SOCKET_URL } from "@/lib/constants";

// Examiner Component
const Examiner = () => {
  const { examState, handleExamState } = useExamState();

  const socketRef = useRef<Socket | null>(null);

  const [
    { duration, examId, isRunning, subject, isFinished, timeLeft },
    setExamData,
  ] = useState<ExamRoomDto>(initialExamRoom);
  const [statusMessage, setStatusMessage] = useState("");
  const [examSubject, setExamSubject] = useState("Mathematics");
  const [examDuration, setExamDuration] = useState(120);
  const [currentStep, setCurrentStep] = useState(1);

  const handleExamData = (data: Partial<ExamRoomDto>) => {
    setExamData((prev) => ({ ...prev, ...data }));

    console.log({ isRunning: data.isRunning });

    if (data.isRunning) {
      handleExamState("running");
    } else {
      handleExamState("paused");
    }

    if (data.isFinished) {
      handleExamState("finished");
    }
  };

  const eventHandlers = {
    [LISTEN_ACTIONS.TIMER_UPDATE]: (data: Partial<ExamRoomDto>) => {
      console.log({ TIMER_UPDATE: data.isRunning });
      handleExamData({ ...data, isRunning: true });
    },
    [LISTEN_ACTIONS.EXISTING]: handleExamData,
    [LISTEN_ACTIONS.PAUSED]: handleExamData,
    [LISTEN_ACTIONS.RESET]: ({ duration }: Pick<ExamRoomDto, "duration">) => {
      handleExamData({ isRunning: false, timeLeft: 0, duration });
    },
    [LISTEN_ACTIONS.FINISHED]: handleExamData,
  };

  useEffect(() => {
    const examinerSocket = io(SOCKET_URL);
    socketRef.current = examinerSocket;

    Object.entries(eventHandlers).forEach(([event, handler]) =>
      examinerSocket.on(event, handler)
    );

    return () => {
      Object.keys(eventHandlers).forEach((event) => examinerSocket.off(event));
      examinerSocket.disconnect();
    };
  }, []);

  const createExam = () => {
    if (examId) {
      socketRef.current?.emit(EMIT_EVENTS.JOIN, { examId });
      setStatusMessage(`Exam "${examId}" created successfully`);
      setCurrentStep(2);
    } else {
      setStatusMessage("Please enter an Exam ID");
    }
  };

  const startExam = () => {
    if (examId && examSubject && examDuration) {
      socketRef.current?.emit(EMIT_EVENTS.START, {
        examId,
        isRunning: true,
        isFinished: false,
        duration: examDuration,
        timeLeft: examDuration,
        subject: examSubject,
      });
      setStatusMessage(`Exam "${examSubject}" started`);
      setCurrentStep(3);
    } else {
      setStatusMessage("Please fill all required fields");
    }
  };

  const pauseExam = () => {
    if (examId) {
      socketRef.current?.emit(EMIT_EVENTS.PAUSED, { examId });
      setStatusMessage("Exam paused");
    }
  };

  const resetExam = () => {
    if (examId) {
      socketRef.current?.emit(EMIT_EVENTS.RESET, { examId });
      setStatusMessage("Exam reset");
      setCurrentStep(1);
      // Reset local state too
      setExamData((prev) => ({
        ...prev,
        isFinished: false,
        isRunning: false,
        timeLeft: 0,
      }));
    }
  };

  const startNewExam = () => {
    resetExam();
    setExamSubject("Mathematics");
    setExamDuration(120);
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-xl border border-gray-100">
      <div
        className={`rounded-t-xl p-6 -mx-8 -mt-8 mb-6 text-white transition-colors duration-500 ${getStateColor(
          examState
        )}`}
      >
        <h1 className="text-2xl font-bold text-center">
          {subject ? `${subject} Exam` : "Student Exam Portal"}
        </h1>
      </div>

      {/* Exam Finished Overlay - Only visible when exam is finished */}
      {isFinished ? (
        <ExamCompleted onButtonClick={startNewExam} subject={subject} />
      ) : (
        <>
          {/* Progress indicator - Hide when exam is finished */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                    currentStep >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="text-xs mt-1 text-gray-600">Create</span>
              </div>
              <div
                className={`flex-1 h-1 self-center mx-1 transition-all duration-500 ${
                  currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                    currentStep >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="text-xs mt-1 text-gray-600">Configure</span>
              </div>
              <div
                className={`flex-1 h-1 self-center mx-1 transition-all duration-500 ${
                  currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${
                    currentStep >= 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="text-xs mt-1 text-gray-600">Manage</span>
              </div>
            </div>
          </div>

          {/* Step 1: Configure Exam - Hide when exam is finished */}

          <div
            className={`transition-all duration-500 overflow-hidden ${
              currentStep === 1 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Step 1: Create Exam Session
            </h2>

            {/* Exam ID Input */}
            <div className="mb-4">
              <label
                htmlFor="examId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Exam ID *
              </label>
              <input
                id="examId"
                type="text"
                value={examId}
                placeholder="Enter unique exam identifier"
                onChange={(e) => handleExamData({ examId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Create Exam Button */}
            <button
              onClick={createExam}
              disabled={!examId}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Create Exam Session
            </button>
          </div>

          {/* Step 2: Exam Details - Hide when exam is finished */}

          <div
            className={`transition-all duration-500 overflow-hidden ${
              currentStep === 2 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Step 2: Set Exam Parameters
            </h2>

            {/* Subject Input */}
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                value={examSubject}
                placeholder="e.g. Mathematics, Science, English"
                onChange={(e) => setExamSubject(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Duration Input */}
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (seconds) *
              </label>
              <input
                id="duration"
                type="number"
                min="30"
                value={examDuration}
                onChange={(e) => setExamDuration(parseInt(e.target.value, 10))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
              >
                Back
              </button>
              <button
                onClick={startExam}
                disabled={!examSubject || !examDuration}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Start Exam
              </button>
            </div>
          </div>

          {/* Step 3: Exam Controls - Hide when exam is finished */}

          <div
            className={`transition-all duration-500 overflow-hidden ${
              currentStep === 3 ? "max-h-98 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700">
              Step 3: Control Exam
            </h2>

            <div className="mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-800 font-medium">Exam Info:</span>
                  <span className="text-blue-800 font-bold">{examSubject}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-medium">Exam ID:</span>
                  <span className="text-blue-800 font-bold">{examId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={pauseExam}
                  disabled={!isRunning}
                  className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isRunning ? "Pause Exam" : "Exam Paused"}
                </button>
                <button
                  onClick={startExam}
                  disabled={isRunning}
                  className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Start Exam
                </button>
              </div>
              <div className="flex justify-center m-3">
                <button
                  onClick={resetExam}
                  className="px-4 h-[48px] w-[217px] py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Reset Exam
                </button>
              </div>
            </div>

            {/* Timer display */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <TimerProgress duration={duration} timeLeft={timeLeft} />

              <div className="text-center">
                <p
                  className={`${
                    statusMessage
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {isRunning ? "Exam in progress" : "Exam not running"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Examiner;
