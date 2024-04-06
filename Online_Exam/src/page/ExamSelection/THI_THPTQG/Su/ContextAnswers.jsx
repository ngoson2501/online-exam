import { createContext, useContext } from 'react';

const ContextAnswers = createContext();

export const useAnswersContext = () => {
  return useContext(ContextAnswers);
};

export default ContextAnswers;