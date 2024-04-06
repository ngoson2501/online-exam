import { FC, useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { useAnswersContext } from '../Su/ContextAnswers';
import { instance } from "../../../../axios-instance";
import './style.css'

const Result = () => {
    const {listSelectedAnswers, setListSelectedAnswers} = useAnswersContext();
    const [correctAnswers, setCorrectAnswers] = useState([]); /* danh sách đáp án đúng của các câu hỏi trong đề thi*/
    const [point, setPoint] =useState(0)
  
    const navigate = useNavigate()
   

    const params = useParams();
    const examId = parseInt(params.id)

    const handleRedo = (id) => {
        setListSelectedAnswers([])
        navigate(`/Exam/${id}`)
    }






    useEffect(() => {
        instance.get(`THI_THPT_QG_Mon_Lich_Su/${examId}`)
        .then((response) => {
         
            const correctAnswersList = response.data.Questions.map((question) => question.answer);
            setCorrectAnswers(correctAnswersList);


        })
        
      },[examId])





      useEffect(() => {
        // Tính điểm khi danh sách đáp án và danh sách đáp án đúng đã sẵn sàng
        if (listSelectedAnswers.length > 0 && correctAnswers.length > 0) {
            const newPoint = listSelectedAnswers.reduce((acc, selectedAnswer, index) => {
                // So sánh phần tử tại vị trí index của listSelectedAnswers và correctAnswers
                if (selectedAnswer === correctAnswers[index]) {
                    return acc + 1; // Nếu giống nhau, tăng điểm lên 1
                }
                return acc;
            }, 0);

            // Cập nhật state point
           /*  setPoint((newPoint/(correctAnswers.length))*10); */
           setPoint(((newPoint / correctAnswers.length) * 10).toFixed(1));


              
        }
    }, [listSelectedAnswers, correctAnswers]);




console.log(correctAnswers)
/* console.log(point) */



    
    return(<>

        <div className='result'>
            <div className="box-result">
                <h2>Result</h2>
                <div className="info-result">
                    <p>Điểm cho bài kiểm tra: {point}/10</p>
                    <ul className="box-list-result-question">
                        {correctAnswers.map((answer,index)=>(
                            <li
                            style={{ backgroundColor: listSelectedAnswers[index] === answer ? 'rgb(125, 197, 236)' : 'rgb(234, 115, 115)' }}
                            >{index+1}</li>
                        ))}
                        
                    </ul>
                </div>
                <div>
                    <button onClick={()=>handleRedo(examId)}>Làm lại</button>
                    <button  >save the results</button>
                </div>
            </div>
        </div>

   </>)
}

export default Result