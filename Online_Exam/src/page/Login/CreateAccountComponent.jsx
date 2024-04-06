

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../Admin/UserManagementComponent/Context";
import { instance } from "../../axios-instance";
import moment from 'moment-timezone';
import "./CreateAccountStyle.css";


const CreateAccount = ({ close }) => {
  
  const { users, setUsers } = useUserContext();

  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();





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

     

      // Trường hợp thêm mới
      instance.post('/user', newUser)
        .then(() => {
          // Cập nhật local state hoặc context sau khi thêm mới
          setUsers((prevState) => [...prevState, newUser]);
          console.log(users)

          close()
          
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
   

    /* closeForm();
    showEdit();
    reset(); */
    
  };






  const handleClose = ()=>{
    close()
  }



  return (
    <>
      
        <form className="form-CreateAccount" onSubmit={handleSubmit(onSubmit)}>
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
            <p>Name:</p>
            <input type="text" placeholder="Fullname" {...register("Name")} />
          </div>
          <div>
            <p>Password:</p>
            <input type="password" placeholder="password" {...register("Password")} />
          </div>

          <div>
            <button type="submit">Submit</button>
            <button onClick={handleClose}>Close</button>
          </div>
        </form>
    
    </>
  );
};

export default CreateAccount;
