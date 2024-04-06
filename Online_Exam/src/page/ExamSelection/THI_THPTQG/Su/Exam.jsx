import { FC, useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation  } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { instance } from "../../../../axios-instance";
import { useAnswersContext } from "./ContextAnswers";

import styled from "styled-components";

import './ExamStyle.css';


const Exam = () => {
    const [selectedExam, setSelectedExam] = useState({}); //Đề thi được chọn hiện tại
  
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState(0); 
    const [timeUp, setTimeUp] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // index của câu hỏi hiện tại
    const [selectedAnswer, setSelectedAnswer] = useState() // đáp án chọn hiện tại
    /* const [listSelectedAnswers, setListSelectedAnswers] = useState([]); // list các đáp án đã chọn qua từng câu hỏi */
    const {listSelectedAnswers, setListSelectedAnswers} = useAnswersContext(); // list các đáp án đã chọn qua từng câu hỏi
    /* const [showResults, setShowResults] = useState('false') */
    /* const [correctAnswers, setCorrectAnswers] = useState([]); */ /* danh sách đáp án đúng của các câu hỏi trong đề thi*/
    const navigate = useNavigate()

    const params = useParams();
    const examId = parseInt(params.id)

   
 
      
    
  useEffect(() => {
    instance.get(`THI_THPT_QG_Mon_Lich_Su/${examId}`)
    .then((response) => {
     
      setSelectedExam(response.data)
      setMinutes(response.data.ExamTime)
    })
    
  },[examId])





      

  
  const handleOptionChange = (option) => {
    const updatedAnswers = [...listSelectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setListSelectedAnswers(updatedAnswers);
    
    
  };

  useEffect(() => {
    setSelectedAnswer(listSelectedAnswers[currentQuestionIndex]);

    


  }, [currentQuestionIndex, listSelectedAnswers]);





  const handleNextQuestion = () => {
    // Kiểm tra nếu là câu hỏi cuối cùng, lưu kết quả ngay khi chọn
    if (currentQuestionIndex === selectedExam.Questions.length - 1) {
      const updatedAnswers = [...listSelectedAnswers];
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
      setListSelectedAnswers(updatedAnswers);
      /* console.log(listSelectedAnswers);  */// Hiển thị kết quả đã chọn
    }

    // Chuyển câu hỏi
    if (currentQuestionIndex < selectedExam.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };



  const handleBackQuestion =()=>{
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex-1);
    }
  }

  const handlNavigateQuestion =(index) => {
    setCurrentQuestionIndex(index)
  }





 


    useEffect(() => {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            // Timer has reached zero, you can add logic here
            setTimeUp(true);
            clearInterval(countdown);
          }
        }
      }, 1000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(countdown);
    },[minutes, seconds]);   


    // Thêm useEffect để theo dõi thay đổi của biến timeUp
    useEffect(() => {
      if (timeUp) {
        // Thời gian đã kết thúc, tự động gọi handleSubmit
        handleSubmit(examId);
      }
    }, [timeUp, examId]);







  
  const handleSubmit = (id)=>{

    

/*         const questions = selectedExam?.Questions;
           
        setCorrectAnswers( questions.map((question) => question.answer)); */
       

        navigate(`/Result/${id}`)
        /* navigate('/Result'); */
    
       /*  setShowResults('true'); */
      }

 
  

  
    return (
      <>
          <div className="exam-page">
              <h1>{selectedExam.Title}</h1>
              
                <div className="container-content">
                    
                    <div className="box-content-Exam">
                      

                      <div key={selectedExam?.Questions?.[currentQuestionIndex].id}>
                        <div>
                          <p>Câu {selectedExam?.Questions?.[currentQuestionIndex].id}</p>
                          <p>{selectedExam?.Questions?.[currentQuestionIndex].question}</p>
                        </div>
                          {selectedExam?.Questions?.[currentQuestionIndex].options && selectedExam?.Questions?.[currentQuestionIndex].options.map((option, index) => 
                          (<>
                              
                            <div className="answer-option"> 
                              <input 
                                      type="radio" 
                                      value={option}
                                      checked={selectedAnswer === option}
                                      onChange={() => handleOptionChange(option)}
                                      />  
                              {String.fromCharCode(65 + index)}. {option}
                            </div>
                              
                          </>))}
                              
                      </div>
                      
                      <div className="box-nav-exam">
                          <div className="box-time-exam">
                              {String(minutes).padStart(2, "0")}:
                              {String(seconds).padStart(2, "0")}
                          </div>
                          <div className="box-bt-back-next">
                              <p onClick={()=>handleBackQuestion()}>back</p>
                              <p onClick={()=>handleNextQuestion()}>next</p>
                          </div>
                      </div>
                  </div>


                  <div className="table-questions">
                      <ul>
                        {selectedExam?.Questions?.map((question, index) => (
                          <li key={index}
                          onClick={()=>handlNavigateQuestion(index)}
                          style={{ backgroundColor: listSelectedAnswers[index] ? 'rgb(125, 197, 236)' : '' }}>{index + 1}</li>
                        ))}
                      </ul>
                      <ul>
                          <button  onClick={()=>handleSubmit(examId)}>submit</button>
                          
                      </ul>
                    </div>


              </div>
              

              {/* {
                showResults === 'true' && 
                (<ResultComponent setShowResults={setShowResults} score={listSelectedAnswers} correctAnswers={correctAnswers}></ResultComponent>)
              } */}


          </div>
      </>
  );
};

export default Exam;



/* 
const ResultComponent = ({ setShowResults, score, correctAnswers})=> {
  const [point, setPoint] =useState(0)
  


  useEffect(() => {
    // Tính số lượng điểm
    const newPoint = score.reduce((acc, curr, index) => {
      return acc + (curr === correctAnswers[index] ? 1 : 0);
    }, 0);

    setPoint(newPoint);
  }, [score, correctAnswers]);

  console.log(point)


  const handleReset = () => {
    setShowResults('false');
  };

  return(<>

              <div className="box-result">
                    <h2>Result</h2>
                    <div className="info-result">
                      <p>Point:{point}/{correctAnswers.length}</p>
                    </div>
                    <div>
                        <button onClick={handleReset}>Làm lại</button>
                    </div>
              </div>

         </>)
}




 */