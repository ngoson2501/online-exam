import './StyleTableListQuestion.css'
import { FC, useState, createContext, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useExamContext } from './ContextExam';

import { useParams } from 'react-router-dom';
import { instance } from "/src/axios-instance.jsx";



const TableListQuestion = ({reloadPage, showEdit, examSelect,setItemQuestionEdit, listItemExam, setListItemExam}) => {
  const { ListExams, setListExams } = useExamContext();
  
  


  const params = useParams();
  const examId = parseInt(params.id);

  const handleDelete = (id) => {
  
   console.log(id);
        const updatedListExams = [...ListExams];
        const examIndex = updatedListExams.findIndex((exam) => exam.id === examId);
  

        if (examIndex !== -1) {
          // Lọc ra câu hỏi có id được chỉ định
          updatedListExams[examIndex].Questions = updatedListExams[examIndex].Questions.filter(question => question.id !== id);
          setListExams(updatedListExams);

  
          // Gửi request PUT để cập nhật câu hỏi mới vào cơ sở dữ liệu
          instance.put(`/THI_THPT_QG_Mon_Lich_Su/${examId}`, updatedListExams[examIndex])
            .then(() => {
              console.log('Cập nhật thành công!');
              reloadPage()
              
            })
            .catch((error) => {
              console.error('Lỗi khi cập nhật câu hỏi mới:', error);
              if (error.response) {
                console.error('Phản hồi từ máy chủ:', error.response.data);
              }
            });
        }

      reloadPage()
  };
  
  
  const handleEditt = (index) => {
    
    // Lấy người dùng cần chỉnh sửa từ listUser và chuyển cho BoxForm
    const editedQuestion = { ...examSelect[index] }; // Tạo một bản sao để tránh ảnh hưởng đến listUser gốc
    
    
    /* console.log(editedExam); */
    // Cập nhật state để hiển thị BoxForm ở chế độ chỉnh sửa
    showEdit();

    // Chuyển thông tin của người dùng cần chỉnh sửa cho BoxForm
    setItemQuestionEdit(editedQuestion);
  };
    

return (
  <>
    <div className="box-table-exam">
      <table className="table-list-exam">
        <tr>
          <th>ID</th>
          <th>Question</th>
          <th>Options</th>
          <th>answer</th>
          <th>Edit</th>
          <th>Delete</th>
          
        </tr>
        {examSelect.map((question, index)=>(
         <tr>
         <td>{question.id}</td>
         <td>{question.question}</td>
         <td>
         {
            question.options.map((option, index) => (
             
            <div key={index}>
              <p>{String.fromCharCode(65 + index)}</p>
              <p>{option}</p>
            </div>

            ))
          }
          
         </td>
         <td>{question.answer}</td>
         <td>
           <button onClick={() => handleEditt(index)}>Edit</button>
         </td>
         <td>
           <button onClick={() => handleDelete(question.id)}>Delete</button>
         </td>
     </tr>
       ))}
        
      </table>
    </div>
  </>
);
};


export default TableListQuestion