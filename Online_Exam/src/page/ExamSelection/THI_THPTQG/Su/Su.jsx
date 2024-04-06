import { FC, useState, createContext, useContext } from "react";
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import './SuStyle.css';
import Document from '../../../../components/DocumentComponent/DocumentComponent';

import Exam from "./Exam";
import { useCheckLogin } from "../../../../hook/useCheckLogin";
import { useEffect } from "react";
import { useExamContext } from "../../../Admin/ExamManagementComponent/Management_THI_THPTQG/Management_Exam_Su/ContextExam";
import { instance } from "../../../../axios-instance";

const SuComponent = ()=>{
   
        useCheckLogin()
  
        

    return(<>
                
                <div id='content-page-su'>
                    {/* <h1>THPT QG Môn Sử Page</h1> */}
                    <ExamComponent></ExamComponent>
                    <Routes>
                        
                        <Route path='/History' element={<Exam></Exam>}></Route>
                    </Routes>
                    <Document></Document>
                </div>
                

           </>)
}





/* const statusContext = createContext */
const ExamComponent = () => {

    const [listDataExam, setListDataExam] = useState([])
    const [showQuestion, setShowQuestion] = useState(false) // sử lý việc ẩn hiển list Question
    const [selectedExamIndex, setSelectedExamIndex] = useState(null);
    const navigate = useNavigate()

    const optionsLabels = ['A', 'B', 'C', 'D'];

    

    const handleExam = (id) => {
        navigate(`/Exam/${id}`)
    }



    const getData = () => {
        instance.get("THI_THPT_QG_Mon_Lich_Su")
        .then((response) => {

            setListDataExam(response.data)
          // Set the ListExams state with the updated data from the server
          /* setListExams(response.data); */
        });
      };
  
  
      useEffect(() => {
        getData()
        
      },[])


      /* console.log(listDataExam) */



      const handleShow = (index) => {
        setShowQuestion(true)
        setSelectedExamIndex(index);
        
    }
      
    const cancelQuestion = () => {
        setShowQuestion(false)
        setSelectedExamIndex(null);
    }
    
    

    return (
        <div className='container-exam'>
            <div className='list-exam'>
                {listDataExam.map((exam, index) => (
                    <div className='box-exam'>
                        <div className='box-info-exam'>
                            <h2>{exam.Title}</h2>
                            <p>{exam.Address}</p>
                            <p>{exam.Date}</p>
                            <p>{exam.ExamTime} phút</p>
                            <p>Số câu hỏi: {exam.QuestionNumber}</p>
                        </div>
                          
                        

                        {showQuestion && selectedExamIndex === index ? 
                        
                        (<div className="list-questions">
                                {exam.Questions && exam.Questions.map(question => (
                                    <div className="question" key={question.id}>
                                        <p>Câu {question.id}:</p>
                                        <p>{question.question}</p>
                                        {question.options.map((option, key) => (
                                            <p key={key}>{optionsLabels[key]}. {option}</p>
                                        ))}
                                    </div>
                                ))}
                                <div className='box-btn-nav-exam'>
                                    <a  onClick={()=>handleExam(exam.id)} >BẮT ĐẦU</a>
                                     
                                    <a  onClick={() => cancelQuestion()}>CANCEL</a>
                                </div>
                        </div>) :

                        (<div className='box-btn'>
                        <a onClick={() => handleShow (index)}>Bắt đầu thi</a>
                        </div>)
                        
                        }
                        
                    </div>
                ))}
            </div>
        </div>
    );
}






export default SuComponent


