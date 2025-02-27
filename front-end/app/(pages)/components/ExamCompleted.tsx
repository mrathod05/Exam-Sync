import React from "react";

type Props = {
  subject: string;
  onButtonClick: () => void;
};

const ExamCompleted = ({ subject, onButtonClick }: Props) => {
  return (
    <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h2 className="text-xl font-bold text-green-800 mb-2">Exam Completed!</h2>
      <p className="text-green-700 mb-6">
        The {subject} exam has been successfully completed.
      </p>
      <button
        onClick={onButtonClick}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-md"
      >
        Start New Exam
      </button>
    </div>
  );
};

export default ExamCompleted;
