
import React from "react";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { useExamContext } from "./ContextExam";

import "./Style.css";
import BoxForm from "./BoxForm";
import TableListExam from "./TableListExam";
import { instance } from "/src/axios-instance.jsx";



const ExamManagement = ()=>{
  
  return(<>

          <div className='ExamManagement'>
              
              <ContentPage></ContentPage>
          </div>
          
         </>)
}




const ContentPage = () => {
  const {ListExams, setListExams } = useExamContext();
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});



  

  const handleReload = () => {
    instance.get("THI_THPT_QG_Mon_Lich_Su").then((response) => {
      // Set the ListExams state with the updated data from the server
      setListExams(response.data);
    });
  };


  const show = () => {  
    setItemEdit({}); // Reset editedItem
    setShowForm(true);
  };



useEffect(() => {
  handleReload()
  
},[])
  
/*   useEffect(() => {
    // Thực hiện hành động render lại trang khi ListExams thay đổi
    // Ví dụ: load lại dữ liệu từ server, gửi request API, ...
    instance.get("THI_THPT_QG_Mon_Lich_Su").then((response) => {
      setListExams(response.data);
    });
  }, [ListExams, setListExams]); */

 

  return (
    <>
      <div className="UserManagement">
        <div className="box-input">
          <a onClick={show}>
            <p>Create New Exam</p>
          </a>
        </div>
        <h2>Danh Sách Exams</h2>

        <TableListExam reloadPage={handleReload} showEdit={()=>setShowFormEdit(true)} setItem={setItemEdit}/>
        {showForm === true && <BoxForm reloadPage={handleReload} closeForm={()=>setShowForm(false)}  isEditMode={false}/>}
        {showFormEdit === true && <BoxForm reloadPage={handleReload} closeForm={()=>setShowForm(false)} showEdit={()=>setShowFormEdit(false)} isEditMode={true} editItem={itemEdit} />}

      </div>
    </>
  );
};

export default ExamManagement














