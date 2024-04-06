import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useUserContext } from "./Context";
import "./Style.css";
import { instance } from "../../../axios-instance";
import moment from 'moment-timezone';

const BoxForm = ({reloadPage, closeForm, isEditMode, editItem, showEdit }) => {
  const { users, setUsers } = useUserContext();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Lưu trữ thông tin người dùng trước khi chỉnh sửa
  const [prevUserData, setPrevUserData] = useState(null);

  useEffect(() => {
    // Nếu đang ở chế độ chỉnh sửa, lưu trữ thông tin người dùng trước khi chỉnh sửa
    if (isEditMode) {
      setPrevUserData(editItem);
      reset(editItem);
    }
  }, [isEditMode, editItem, reset]);

  const onSubmit = (data) => {
    
    console.log(data);
    const newUser = {
      /* ID: data.ID, */
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      /* Description: data.Description || "", */
      createdAt: moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DDTHH:mm'),
     
    };



    if (isEditMode === false) {
      // Trường hợp thêm mới
      instance.post('/user', newUser)
        .then(() => {
          // Cập nhật local state hoặc context sau khi thêm mới
          setUsers((prevState) => [...prevState, newUser]);
          reloadPage()
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    } else if (isEditMode === true) {
      // Trường hợp chỉnh sửa
      instance.put(`/user/${editItem.id}`, newUser)
        .then(() => {
          // Cập nhật local state hoặc context sau khi chỉnh sửa
          const userIndex = users.findIndex((user) => user.id === editItem.id);
          if (userIndex !== -1) {
            newUser.id = editItem.id;
            const updatedUserList = [...users];
            updatedUserList[userIndex] = { ...newUser };
            setUsers(updatedUserList);
            reloadPage()
          }
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }

    closeForm();
    showEdit();
    reset();
    
  };

  const handleClose = () => {
    // Nếu đang ở chế độ chỉnh sửa, khôi phục lại thông tin người dùng trước khi chỉnh sửa
    if (isEditMode && prevUserData) {
      setUsers((prevState) =>
        prevState.map((user) => (user.id === prevUserData.id ? { ...prevUserData } : user))
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
            <h2>Create New Account</h2>
            
          </div>

          <div>
            <p>Name:</p>
            <input type="text" placeholder="name" {...register("Name", { required: true })} />
          </div>
          <div>
            <p>Email:</p>
            <input type="text" placeholder="email" {...register("Email", { required: true })} />
          </div>
          <div>
            <p>Password:</p>
            <input type="password" placeholder="password" {...register("Password", {required: true})} />
          </div>
          {/* <div>
            <p>Description:</p>
            <input type="text" placeholder="Description" {...register("Description")} />
          </div> */}

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