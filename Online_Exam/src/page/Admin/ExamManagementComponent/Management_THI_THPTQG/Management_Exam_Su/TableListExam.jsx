import './Style.css'
import { FC, useState, createContext, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useExamContext } from './ContextExam';
import { instance } from "/src/axios-instance.jsx";

const TableListExam = ({ reloadPage, showEdit, setItem}) => {
  const { ListExams, setListExams } = useExamContext();
    // Hàm xử lý xóa user theo index
    const navigate = useNavigate();

   
    
    const handleDelete = (id) => {

        instance.delete(`THI_THPT_QG_Mon_Lich_Su/${id}`)
        .then(() => {
          const updatedList = ListExams.filter(exam => exam.id !== id);
        setListExams(updatedList);
       /*  console.log(updatedList) */
       reloadPage()

        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });;
    };



    const handleEdit = (index) => {
      // Lấy người dùng cần chỉnh sửa từ listUser và chuyển cho BoxForm
      const editedExam = { ...ListExams[index] }; // Tạo một bản sao để tránh ảnh hưởng đến listUser gốc
      
      
      // Cập nhật state để hiển thị BoxForm ở chế độ chỉnh sửa
      showEdit();
  
      // Chuyển thông tin của người dùng cần chỉnh sửa cho BoxForm
      setItem(editedExam);
    };
  


    const handleNavigate = (id) => {
      // Sử dụng navigate để chuyển hướng và truyền id qua tham số URL
      navigate(`/Quan_Ly_Exam/add-question/${id}`);
    };



    
   



    return (
      <>
        <div className="box-table-user">
          <table className="table-list-user">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Address</th>
              <th>Date</th>
              <th>ExamTime</th>
              <th>Question Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {ListExams.map((exam, index) => (
              <tr key={index}>
                <td>{exam.id}</td>
                {/* <td>
                <Link to={`/Quan_Ly_Exam/add-question/`} style={{ textDecoration: 'none', color: 'black' }}>{exam.Title}</Link>
                </td> */}
                
                <td>
                <Link onClick={() => handleNavigate(exam.id)} style={{ textDecoration: 'none', color: 'black' }}>{exam.Title}</Link>
                </td>
                {/* <td>{exam.Title}</td> */}
                <td>{exam.Address}</td>
                <td>{exam.Date}</td>
                <td>{exam.ExamTime}</td>
                <td>{exam.QuestionNumber}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(exam.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  };


export default TableListExam