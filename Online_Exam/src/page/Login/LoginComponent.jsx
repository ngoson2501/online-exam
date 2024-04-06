import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import CreateAccount from "./CreateAccountComponent";
import { useUserContext } from "../Admin/UserManagementComponent/Context";
import { instance } from "../../axios-instance";
import { useCheckLogin } from "../../hook/useCheckLogin";
import './LoginStyle.css'




const Login = ()=>{
    const { users, setUsers } = useUserContext();   //list danh sách tài khoản có trong API
    const [mode, setmode] = useState(true)          // sét chế độ login hay creact new account
    const [checkLogin, setCheckLogin] = useState("")
    /* const [accountUser, setAccountUser] = useState() */
    const navigate = useNavigate()

    const handleReload = () => {
      instance.get("user")
      .then((response) => {
        setUsers(response.data);

      });
    };

    const handleClose= () => {
        navigate('/')
    }
  
  
  
    useEffect(() => {
      handleReload()
    },[])
  
    

    const handleLogout =()=>{
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      console.log('Đăng xuất thành công!');
      // Thực hiện các hành động sau khi đăng xuất thành công
      
      if(!localStorage.getItem('name') || !localStorage.getItem('email')){
        navigate('/')
    }
    }


    const editMode = ()=>{
      setmode(false);
  }




    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();


const onSubmit = (data) => {
 
  // Tìm người dùng trong mảng dựa trên Email và Password
  const foundUser = users.find(user => user.Email === data.Email && user.Password === data.Password);

  if (foundUser) {
    console.log('Đăng nhập thành công!');

    localStorage.setItem('email', foundUser.Email)
    localStorage.setItem('name', foundUser.Name)
    /* localStorage.setItem('account', JSON.stringify(foundUser)); */
    setCheckLogin("true")

    handleReload()
    // Thực hiện các hành động sau khi đăng nhập thành công
  } else {
    console.log('Sai thông tin đăng nhập!');
    setCheckLogin("false")
    // Thông báo hoặc thực hiện các hành động sau khi đăng nhập thất bại
  }
}


  /* console.log( localStorage.getItem('name')); */



    return(<>
        <div className="box-cont-page-login">
            
          {
            mode === true && 
            <>
                <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                    <h2>Log in</h2>
                    
                    {/* {checkLogin ? <p>login successfully</p> : <p>Login failed, please create a new account</p>} */}
                    <p style={ {color: checkLogin==="true" ? 'blue' : 'red', display: checkLogin==="" ?'none': 'block'  }}>
                      {checkLogin === "true" ? 'Login successfully' : 'Login failed, please create a new account'}
                    </p>
                    </div>
                    <div>
                    <p>Email:</p>
                    <input type="text" placeholder="email" {...register("Email", { required: true })} />
                    </div>
                    <div>
                    <p>Password:</p>
                    <input type="password" placeholder="password" {...register("Password", { required: true })} />
                    </div>
                    <div>
                    <p onClick={handleLogout}>Logout</p>
                    <p onClick={editMode}>Create Account</p>
                    
                    </div>
                        
        
                    <div>
                    <button type="submit">Log in</button>
                    <button onClick={handleClose()}>Close</button>
                    </div>
                </form>
            </>


          }

          {mode === false && <CreateAccount close={()=>setmode(true)}></CreateAccount>}
          
            
          
        </div>
        
      </>)
}

export default Login