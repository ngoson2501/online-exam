
import React from "react";
import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useExamContext } from "./ContextExam";
import TableListQuestion from "./TableListQuestion";
import BoxFormQuestion from "./BoxFormQuestion";
import { instance } from "/src/axios-instance.jsx";

import './StyleTableListQuestion.css';

const AddQuestion = ()=>{
    return(<>

            <div className='page-add-question'>
                
                <ContentAddQuestion></ContentAddQuestion>
            </div>
            
           </>)
  }



  const ContentAddQuestion = () => {
    const [showForm, setShowForm] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);
    const [itemEdit, setItemEdit] = useState({});
    const { ListExams, setListExams } = useExamContext();

    const [NewListExams, setNewListExams] = useState([])
    const [questions, setQuestions] = useState([]);
    const [topicExam, setTopicExam]=useState({}) //là đề thi được chọn để in danh sách câu hỏi ra màn hình 
    const [listItem, setListItem] = useState({})// là danh sách tất cả các đề thi khi call API được gán vào
    const [questionEdit, setQuestionEdit]=useState({})


    const {itemExam, setItemExam} = useExamContext();
  
  
    
    const params = useParams();
    const examId = parseInt(params.id)


    const handleReload = () => {
      instance.get("THI_THPT_QG_Mon_Lich_Su").then(() => {
        // Set the ListExams state with the updated data from the server
        /* setListExams(response.data); */
      });
    };


    useEffect(() => {
      handleReload()
      
    },[])

    useEffect(() => {
      if (examId) {
        instance.get('THI_THPT_QG_Mon_Lich_Su/') 
          .then((response) => {
            const selectedExam = response.data.find((exam) => exam.id === examId);
            setQuestions(selectedExam.Questions)
            setTopicExam(selectedExam)
            setListItem(response.data)
         
          })
          .catch((error) => {
            console.error("Error fetching exam data:", error);
          });
      }
    }, [/* examId, setItemExam, */ListExams]);





    const show = () => {
      setItemEdit({}); // Đặt lại editedItem
      setShowForm(true);
    };
  

    return (
      <>
        <div className="ExamManagement">
          <div className="box-input">
            <a onClick={show}>
              <p>Create new question</p>
            </a>
          </div>
          <h2>Danh Sách Câu Hỏi: {topicExam.Title}</h2>
          {/* Truyền mảng câu hỏi vào TableListQuestion */}
          <TableListQuestion reloadPage={handleReload} showEdit={()=>setShowFormEdit(true)} examSelect={questions} listItemExam={listItem} setListItemExam={setListItem} setItemQuestionEdit={setQuestionEdit}/>
          {showForm === true && (<BoxFormQuestion reloadPage={handleReload} setUpdateExam={setNewListExams} updateExam={NewListExams} selectItemExam={itemExam}  closeForm={() => setShowForm(false)} isEditMode={false} showEdit={() => setShowFormEdit(false)}/>)}
          {showFormEdit === true && <BoxFormQuestion reloadPage={handleReload} closeForm={() => setShowForm(false)} showEdit={() => setShowFormEdit(false)} isEditMode={true} ItemQuestionEdit={questionEdit} setItemQuestionEdit={setQuestionEdit} />}
        </div>
      </>
    );
  };


export default AddQuestion


