import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useExamContext } from "./ContextExam";

import "./StyleTableListQuestion.css";
import { instance } from "/src/axios-instance.jsx";
import { useParams } from 'react-router-dom';

const BoxFormQuestion = ({reloadPage, closeForm, isEditMode, editItem, showEdit, ItemQuestionEdit,setItemQuestionEdit, selectItemExam, setUpdateExam, updateExam }) => {
  const { ListExams, setListExams } = useExamContext();
  const [prevUserData, setPrevUserData] = useState(null);


  



  const params = useParams();
  const examId = parseInt(params.id);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();







  useEffect(() => {
    // Nếu đang ở chế độ chỉnh sửa, lưu trữ thông tin người dùng trước khi chỉnh sửa
    if (isEditMode) {
      setPrevUserData(ItemQuestionEdit);
      reset(ItemQuestionEdit);
    }
  }, [isEditMode, ItemQuestionEdit, reset]);





  const onSubmit = (data) => {
    const newQuestion = {
      id: data.id,
      question: data.question,
      options: [data.options_A, data.options_B, data.options_C, data.options_D],
      answer: data.answer,
    };

    if(isEditMode === false) {
     
      
    // Gửi request POST để thêm câu hỏi mới vào danh sách câu hỏi của đề thi có id là examId
    instance.get(`/THI_THPT_QG_Mon_Lich_Su/${examId}`)
    .then((response) => {
      // Cập nhật local state sau khi thêm câu hỏi thành công
      const updatedListExams = [...ListExams];
      const examIndex = updatedListExams.findIndex((exam) => exam.id === examId);

      if (examIndex !== -1) {
        // Thêm newQuestion vào mảng Questions của đề thi có id là examId
        updatedListExams[examIndex].Questions = [
          ...updatedListExams[examIndex].Questions,
          newQuestion
        ];
        

        // Sắp xếp mảng các câu hỏi theo trường id từ bé đến lớn
        updatedListExams[examIndex].Questions.sort((a, b) => a.id - b.id);

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
    })
    .catch((error) => {
      console.error('Lỗi khi thêm câu hỏi mới:', error);
      if (error.response) {
        console.error('Phản hồi từ máy chủ:', error.response.data);
      }
    });

    

    }/* else if (isEditMode === true) {
      // Code for updating an existing question
      instance.get(`/THI_THPT_QG_Mon_Lich_Su/${examId}`)
        .then((response) => {
          const updatedListExams = [...ListExams];
          const examIndex = updatedListExams.findIndex((exam) => exam.id === examId);
          
          if (examIndex !== -1) {
            const updatedQuestions = updatedListExams[examIndex].Questions.map((question) =>
              question.id === editItem.id ? { ...question, ...newQuestion } : question
            );

            updatedListExams[examIndex].Questions = updatedQuestions;
            setListExams(updatedListExams);

            // Send a PUT request to update the question in the database
            instance.put(`/THI_THPT_QG_Mon_Lich_Su/${examId}`, updatedListExams[examIndex])
              .then(() => {
                console.log('Question updated successfully!');
              })
              .catch((error) => {
                console.error('Error updating question:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error updating question:', error);
        });

        
    } */

    
    closeForm();
    showEdit();
    reset();
  };

    

  const handleClose = () => {
    if (isEditMode && prevUserData) {
      // Map the old data to match your form fields
      const oldData = {
        id: prevUserData.id,
        question: prevUserData.question,
        options:[...prevUserData.options],
        answer: prevUserData.answer,
      };

      // Find the index of the question being edited
      const questionIndex = ItemQuestionEdit.findIndex((question) => question.id === prevUserData.id);

      // Update the question in the state
      setItemQuestionEdit((prevState) => {
        const newState = [...prevState];
        newState[questionIndex] = { ...oldData };
        return newState;
      });

      reset(oldData);
    }

    closeForm();
    showEdit();
    reloadPage()
  };
  




  return (
    <>
      <div className="box-form">
        <form className="form-user" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2>Create New Question</h2>
          </div>
          {/* Trường nhập ID */}
          {/* <div>
            <p>ID:</p>
            <input type="text" placeholder="ID" {...register("ID", { required: true })} />
          </div> */}
          {/* Các trường thông tin khác */}
          <div>
            <p>Id:</p>
            <input type="text" placeholder="Id" {...register("id", { required: true })} />
          </div>
          <div>
            <p>Ouestion:</p>
            <input type="text" placeholder="Question" {...register("question", { required: true })} />
          </div>
          <div>
            <p>Options A:</p>
            <input type="text" placeholder="Options A" {...register("options_A", { required: true })} />
          </div>
          <div>
            <p>Options B:</p>
            <input type="text" placeholder="Options B" {...register("options_B", { required: true })} />
          </div>
          <div>
            <p>Options C:</p>
            <input type="text" placeholder="Options C" {...register("options_C", { required: true })} />
          </div>
          <div>
            <p>Options D:</p>
            <input type="text" placeholder="Options D" {...register("options_D", { required: true })} />
          </div>
          <div>
            <p>Answer:</p>
            <input type="text" placeholder="Answer" {...register("answer", { required: true })} />
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

export default BoxFormQuestion;
