import React from "react";
import { FC, useState, createContext, useContext, useEffect } from "react";
import { useUserContext } from "./Context";

import "./Style.css";
import BoxForm from "./BoxForm";
import TableListUser from "./TableListUser";
import { instance } from "../../../axios-instance";




const UserManagement = () => {
  /* const [users, setUsers] = useState([]); */
  const { users, setUsers } = useUserContext();
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({});

  
 

  const show = () => {
    /* setShowForm(true); */
    
  setItemEdit({}); // Reset editedItem
  setShowForm(true);
  };

  /* const closeForm = () => {
    setShowForm(false);
  }; */
  /* const closeForm = () => {
    console.log("Closing form"); // Kiểm tra xem hàm này có được gọi không
    setShowForm(false);
  };
   */

  
/*   useEffect(() => {
    // Thực hiện hành động render lại trang khi ListExams thay đổi
    // Ví dụ: load lại dữ liệu từ server, gửi request API, ...
    instance.get("user").then((response) => {
      setUsers(response.data);
    });
  }, [users, setUsers]); */



  const handleReload = () => {
    instance.get("user").then((response) => {
      setUsers(response.data);
    });
  };



  useEffect(() => {
    handleReload()
    
  },[])





  return (
    <>
      <div className="UserManagement">
        <div className="box-input">
          <a onClick={show}>
            <p>Create New Account</p>
          </a>
        </div>
        <h2>Danh Sách Account</h2>
        {/* <TableListUser listUser={users} update={setUsers} showEdit={setShowFormEdit} setItem={setItemEdit}/>

        {showForm === true && <BoxForm closeForm={setShowForm} saveUsers={setUsers} list={users} isEditMode={false}/>}
        {showFormEdit === true && <BoxForm closeForm={setShowForm} saveUsers={setUsers} list={users} isEditMode={true} editItem={itemEdit} showEdit={setShowFormEdit}/>} */}

        <TableListUser /* listUser={users} update={setUsers} */ reloadPage={handleReload} showEdit={()=>setShowFormEdit(true)} setItem={setItemEdit}/>

        {showForm === true && <BoxForm reloadPage={handleReload} closeForm={()=>setShowForm(false)} showEdit={()=>setShowFormEdit(false)} isEditMode={false}/>}
        {showFormEdit === true && <BoxForm closeForm={()=>setShowForm(false)} showEdit={()=>setShowFormEdit(false)} isEditMode={true} editItem={itemEdit} />}

      </div>
    </>
  );
};

export default UserManagement;














