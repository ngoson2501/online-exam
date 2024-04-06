/* import {Routes, Route, Link} from 'react-router-dom' */


import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import React, { useState } from 'react';
import './App.css'
import Layout from "./components/LayoutComponent/Layout";
import LayoutAdmin from "./components/LayoutAdminComponent/LayoutAdmin";
import HomeComponent from './page/Home/Home'
import Login from "./page/Login/LoginComponent";
import ToanComponent from './page/ExamSelection/THI_THPTQG/Toan/Toan'
import SuComponent from './page/ExamSelection/THI_THPTQG/Su/Su'
import SinhComponent from './page/ExamSelection/THI_THPTQG/Sinh/Sinh'
import UserManagement from './page/Admin/UserManagementComponent/UserManagement'
import Exam from "./page/ExamSelection/THI_THPTQG/Su/Exam";
import Result from "./page/ExamSelection/THI_THPTQG/result/result";

import ExamManagement from './page/Admin/ExamManagementComponent/Management_THI_THPTQG/Management_Exam_Su/Management'
import AddQuestion from "./page/Admin/ExamManagementComponent/Management_THI_THPTQG/Management_Exam_Su/AddQuestions";


import UserDetail from "./page/Detail/UserDetail";
import UserContext from "./page/Admin/UserManagementComponent/Context";
/* import ContextExam from "./page/Admin/ExamManagementComponent/Management_THI_THPTQG/Management_Exam_Su/ContexExam"; */
import ContextExam from "./page/Admin/ExamManagementComponent/Management_THI_THPTQG/Management_Exam_Su/ContextExam";
import ContextAnswers from "./page/ExamSelection/THI_THPTQG/Su/ContextAnswers";

function App() {
  const [users, setUsers] = useState([]);
  

  const [ListExams, setListExams] = useState([]);

  const [listSelectedAnswers, setListSelectedAnswers] = useState([]);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:
      [
        {
          path:"/",
          element:<HomeComponent/>
        },
        
        {
          path: "/THPTQG_Mon_Toan",
          element: <ToanComponent />
        },
        {
          path: "/THPTQG_Mon_Su",
          element: (
                
            <ContextExam.Provider value={{ ListExams, setListExams }}>
              <SuComponent />
              
            </ContextExam.Provider>
          
          )
        },
        {
          path: "/Exam/:id",
          element: (
                
            <ContextExam.Provider value={{ ListExams, setListExams  }}>
              <ContextAnswers.Provider value={{ listSelectedAnswers, setListSelectedAnswers }}>
                <Exam/>
              </ContextAnswers.Provider>
            </ContextExam.Provider>
          
          )
        },
        {
          path: "/Result/:id",
          element: (
                
            <ContextAnswers.Provider value={{ listSelectedAnswers, setListSelectedAnswers }}>
              <Result/>
            </ContextAnswers.Provider>
          
          )
        },

        {
          path: "/THPTQG_Mon_Sinh",
          element: <SinhComponent />
        },
        {
          path:"/Quan_Ly_User",
          element: (
            <UserContext.Provider value={{ users, setUsers }}>
              <UserManagement />
            </UserContext.Provider>
          ),
        },
        {
          path: "/user-detail/:userId",
          
          element: (
            <UserContext.Provider value={{ users, setUsers  }}>
              <UserDetail />,
            </UserContext.Provider>
          ),
        },
        
        {
          path: "/Login",
          element: (
            <UserContext.Provider value={{ users, setUsers  }}>
                < Login/>
            </UserContext.Provider>
          )
        }

        /* {
          path: "/user-detail/:userId",
          element: (
            <ContextExam.Provider value={{ ListExams, setListExams }}>
              <AddQuestion />
            </ContextExam.Provider>
          ),
        } */
        
      ]
    },

    {
      path: "/Quan_Ly_Exam",
      element: (
                
        <ContextExam.Provider value={{ ListExams, setListExams }}>
          <LayoutAdmin/>
        </ContextExam.Provider>
      
      ),
      children: [
          {
            path:"",
            element:<HomeComponent/>
          },
          
          {
              path: "Create_THPT_QG_Môn_Sử",
              element: (
                
                <ContextExam.Provider value={{ ListExams, setListExams }}>
                  <ExamManagement />
                </ContextExam.Provider>
              
              ),
          },

          {
            path: "add-question/:id",
            element: (
              <ContextExam.Provider value={{ ListExams, setListExams}}>
                <AddQuestion />
              </ContextExam.Provider>
            ),
          }
      ],
  },
    
    
    
    
  ])
  

  return (
    <>
    
    {/* <RouterProvider router={router} >
  
    </RouterProvider> */}

    <ContextExam.Provider value={{ ListExams, setListExams}}>
        <RouterProvider router={router}>
          {/* Your routes */}
        </RouterProvider>
    </ContextExam.Provider>
    
    </>
  )
}

export default App























{/* <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path='/THPTQG_Mon_Toan' element={<ToanComponent></ToanComponent>}></Route>
        <Route path='/THPTQG_Mon_Su' element={<SuComponent></SuComponent>}></Route>
        <Route path='/THPTQG_Mon_Sinh' element={<SinhComponent></SinhComponent>}></Route>
        <Route path='/Quan_Ly_User' element={<UserManagement></UserManagement>}></Route>
        <Route path='/Quan_Ly_Exam' element={<ExamManagement></ExamManagement>}></Route>
      </Routes> */}