import { createContext, useContext } from 'react';

const ContextQuestion = createContext();

export const useQuestionContext = () => {
  return useContext(useQuestionContext);
};

export default ContextQuestion;
