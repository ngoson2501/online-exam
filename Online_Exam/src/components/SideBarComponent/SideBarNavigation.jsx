import {Routes, Route, Link, useNavigate, useParams} from 'react-router-dom'

import React, { useState, useEffect,} from 'react';
import './Style.css'

const SideBarNavigation = ()=>{
   

   /*  const { paramName } = useParams(); */
    
 
   /*  const navigate = useNavigate();
    
    const handleLinkClick = () => {

        navigate('/Quan_Ly_Exam/Create_THPT_QG_Môn_Sử');
    }; */

    



    return(<>
                <nav className='Side-Bar-Navigation'>
                    
                    <h3>THI THPTQG</h3>
                        <ul>
                            <li>THPT QG Môn Toán</li>
                            <li>THPT QG Môn Tiếng Anh</li>
                            <li>THPT QG Môn Lý</li>
                            <li>THPT QG Môn Hóa</li>
                            <li>THPT QG Môn Sinh</li>

                            <li>
                                <Link to="/Quan_Ly_Exam/Create_THPT_QG_Môn_Sử" style={{ textDecoration: 'none', color: 'rgb(43, 43, 43)' }} >THPT QG Môn Sử</Link>
                            </li>
                            
                            <li>THPT QG Môn Địa</li>
                            <li>THPT QG Môn GDCD</li>
                        </ul>  
                    <h3>ĐỀ THI KIỂM TRA</h3>
                        <ul>
                            <li>Trắc nghiệm Toán 12</li>
                            <li>Trắc nghiệm Lý 12</li>
                            <li>Trắc nghiệm Hóa 12</li>
                            <li>Trắc nghiệm Sinh 12</li>
                            <li>Trắc nghiệm Tiếng Anh 12</li>
                            <li>Trắc nghiệm Lịch Sử 12</li>
                            <li>Trắc nghiệm Địa 12</li>
                            <li>Trắc nghiệm GDCD Sử 12</li>
                            <li>Trắc nghiệm Toán 11</li>
                            <li>Trắc nghiệm Lý 11</li>
                            <li>Trắc nghiệm Hóa 11</li>
                            <li>Trắc nghiệm Sinh 11</li>
                            <li>Trắc nghiệm Tiếng Anh 11</li>
                            <li>Trắc nghiệm Lịch Sử 11</li>
                            <li>Trắc nghiệm Địa 11</li>
                            <li>Trắc nghiệm GDCD Sử 11</li>
                            <li>Trắc nghiệm Toán 10</li>
                            <li>Trắc nghiệm Lý 10</li>
                            <li>Trắc nghiệm Hóa 10</li>
                            <li>Trắc nghiệm Sinh 10</li>
                            <li>Trắc nghiệm Tiếng Anh 10</li>
                            <li>Trắc nghiệm Lịch Sử 10</li>
                            <li>Trắc nghiệm Địa 10</li>
                            <li>Trắc nghiệm GDCD Sử 10</li>
                        </ul>
                    <h3>ENGLISH TEST</h3>
                        <ul>
                            <li>Từ vựng Tiếng Anh</li>
                            <li>Ngữ pháp Tiếng Anh</li>
                            <li>TOEIC</li>
                        </ul>
                    <h3>IT TEST</h3>
                        <ul>
                            <li>Quản trị hệ thống</li>
                            <li>Tin học văn phòng</li>
                            <li>Lập trình</li>
                        </ul>
                    <h3>ĐẠI HỌC</h3>
                        <ul>
                            <li>Các môn Đại Cương</li>
                            <li>Quản trị - Marketing</li>
                            <li>Kinh tế - Thương mạ</li>
                            <li>Tài chính - Ngân hàng</li>
                            <li>Kế toán - Kiểm toán</li>
                            <li>Khoa học kỹ thuật</li>
                            <li>Xã hội nhân văn</li>
                            <li>Luật - Môn khác</li>
                        </ul>

                </nav>

           </>)
}

export default SideBarNavigation