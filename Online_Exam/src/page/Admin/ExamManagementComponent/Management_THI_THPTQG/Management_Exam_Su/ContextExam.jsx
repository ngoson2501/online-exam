import { createContext, useContext } from 'react';

const ContextExam = createContext();

export const useExamContext = () => {
  return useContext(ContextExam);
};

export default ContextExam;
