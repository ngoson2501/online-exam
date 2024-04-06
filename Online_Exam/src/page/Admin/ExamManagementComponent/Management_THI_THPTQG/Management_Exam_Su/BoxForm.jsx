import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useExamContext } from "./ContextExam";
import "./Style.css";
import { instance } from "/src/axios-instance.jsx";




const BoxForm = ({ closeForm, isEditMode, editItem, showEdit, reloadPage }) => {
    const { ListExams, setListExams } = useExamContext();
  // Lưu trữ thông tin người dùng trước khi chỉnh sửa
  const [prevUserData, setPrevUserData] = useState(null);
  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  useEffect(() => {
    // Nếu đang ở chế độ chỉnh sửa, lưu trữ thông tin người dùng trước khi chỉnh sửa
    if (isEditMode) {
      setPrevUserData(editItem);
      reset(editItem);
    }
  }, [isEditMode, editItem, reset]);

  const onSubmit = (data) => {
    
    /* console.log(newExam); */

    if (isEditMode === false) {
      const newExam = {
        /* ID: data.ID, */
        Title: data.Title,
        Address: data.Address,
        Date: data.Date,
        ExamTime: data.ExamTime,
        QuestionNumber: data.QuestionNumber || "",
        Questions:[],
  
        /* createdAt: new Date().toISOString(), */
       
      };

      // Trường hợp thêm mới
      instance.post('/THI_THPT_QG_Mon_Lich_Su', newExam)
        .then(() => {
          // Cập nhật local state hoặc context sau khi thêm mới
          setListExams((prevState) => [...prevState, newExam]);

          reloadPage();
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    } else if (isEditMode === true) {
      // Trường hợp chỉnh sửa
      /* instance.put(`/THI_THPT_QG_Mon_Lich_Su/${editItem.id}`, newExam)
        .then(() => {
          // Cập nhật local state hoặc context sau khi chỉnh sửa
          const ExamIndex = ListExams.findIndex((exam) => exam.id === editItem.id);
          
          console.log(ExamIndex)

          if (ExamIndex !== -1) {
            newExam.id = editItem.id;
            const updatedExamList = [...ListExams];
            updatedExamList[ExamIndex] = { ...newExam };
            setListExams(updatedExamList);
            
            
          }
          
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        }); */



        const newExamEdit = {
          id: data.id,
          Title: data.Title,
          Address: data.Address,
          Date: data.Date,
          ExamTime: data.ExamTime,
          QuestionNumber: data.QuestionNumber || "",
          Questions: data.Questions
    
          /* createdAt: new Date().toISOString(), */
         
        };
      
          // Cập nhật local state hoặc context sau khi chỉnh sửa
          const ExamIndex = ListExams.findIndex((exam) => exam.id === editItem.id);
          
          if (ExamIndex !== -1) {
            newExamEdit.id = editItem.id;
            const updatedExamList = [...ListExams];
            updatedExamList[ExamIndex] = { ...newExamEdit };
            setListExams(updatedExamList);
            instance.put(`/THI_THPT_QG_Mon_Lich_Su/${editItem.id}`, newExamEdit)
          }
          
       

        reloadPage();// thực hiện hàm Load lại trang
    }

    closeForm();
    showEdit();
    reset();
    reloadPage()
  };

  const handleClose = () => {
    // Nếu đang ở chế độ chỉnh sửa, khôi phục lại thông tin người dùng trước khi chỉnh sửa
    if (isEditMode && prevUserData) {
      setListExams((prevState) =>
        prevState.map((exam) => (exam.id === prevUserData.id ? { ...prevUserData } : exam))
      );
    }

    closeForm();
    showEdit();
    reset();
  };

  return (
    <>
      <div className="box-form">
        <form className="form-user" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Create New Product</h2>
          </div>
          {/* Trường nhập ID */}
          {/* <div>
            <p>ID:</p>
            <input type="text" placeholder="ID" {...register("ID", { required: true })} />
          </div> */}
          {/* Các trường thông tin khác */}
          <div>
            <p>Title:</p>
            <input type="text" placeholder="Title" {...register("Title", { required: true })} />
          </div>
          <div>
            <p>Address:</p>
            <input type="text" placeholder="Address" {...register("Address", { required: true })} />
          </div>
          <div>
            <p>Date:</p>
            <input type="text" placeholder="Date" {...register("Date")} />
          </div>
          <div>
            <p>ExamTime:</p>
            <input type="text" placeholder="ExamTime" {...register("ExamTime")} />
          </div>
          <div>
            <p>Question Number:</p>
            <input type="text" placeholder="QuestionNumber" {...register("QuestionNumber")} />
          </div>

          <div>
            <button type="submit">Submit</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BoxForm;
