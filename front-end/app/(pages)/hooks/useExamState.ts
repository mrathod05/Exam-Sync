import { useState } from "react";

const useExamState = () => {
  const [examState, setExamState] = useState<TypeExamState>("waiting");

  const handleExamState = (state: TypeExamState) => {
    setExamState(() => state);
  };
  return { examState, handleExamState };
};

export default useExamState;
