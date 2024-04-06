/* import styled from "styled-components" */
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
/* import './indexStyle.css' */
import './HeaderStyle.css'

let categorizedData = [
    {
        "THI THPTQG":[
        {
            "THPT QG Môn Toán":
            {
                "href":"/THPTQG_Mon_Toan"
            },
            "THPT QG Môn Tiếng Anh":
            {
                "href":"/THPTQG_Mon_Tieng_Anh"
            },
            "THPT QG Môn Lý":
            {
                "href":"/THPTQG_Mon_Ly"
            },
            "THPT QG Môn Hóa":
            {
                "href":"/THPTQG_Mon_Hoa"
            }
            
        },
        {
            "THPT QG Môn Sinh":
            {
                "href":"/THPTQG_Mon_Sinh"
            },
            "THPT QG Môn Sử":
            {
                "href":"/THPTQG_Mon_Su"
            },
            "THPT QG Môn Địa":
            {
                "href":"/THPTQG_Mon_Dia"
            },
            "THPT QG Môn GDCD":
            {
                "href":"/THPTQG_Mon_GDCD"
            }
        }
    ],
    },
    {
        "ĐỀ THI KIỂM TRA":[
        {
            "Trắc nghiệm Toán 12":{},
            "Trắc nghiệm Lý 12":{},
            "Trắc nghiệm Hóa 12":{},
            "Trắc nghiệm Sinh 12":{},
        },
        {
            "Trắc nghiệm Tiếng Anh 12":{},
            "Trắc nghiệm Lịch Sử 12":{},
            "Trắc nghiệm Địa 12":{},
            "Trắc nghiệm GDCD 12":{}
        },
        {
            "Trắc nghiệm Toán 11":{},
            "Trắc nghiệm Lý 11":{},
            "Trắc nghiệm Hóa 11":{},
            "Trắc nghiệm Sinh 11":{}
        },
        {
            "Trắc nghiệm Tiếng Anh 11":{},
            "Trắc nghiệm Lịch Sử 11":{},
            "Trắc nghiệm Địa 11":{},
            "Trắc nghiệm GDCD 11":{}
        },
        {
            "Trắc nghiệm Toán 10":{},
            "Trắc nghiệm Lý 10":{},
            "Trắc nghiệm Hóa 10":{},
            "Trắc nghiệm Sinh 10":{}
        },
        {
            "Trắc nghiệm Tiếng Anh 10":{},
            "Trắc nghiệm Lịch Sử 10":{},
            "Trắc nghiệm Địa 10":{},
            "Trắc nghiệm GDCD 10":{}
        }
    ],
    },
    {"ENGLISH TEST":[
        {
            "Từ vựng Tiếng Anh":{},
            "Ngữ pháp Tiếng Anh":{},
            "TOEIC":{}
        }
    ],
    },
    {
        "IT TEST":[
        {
            "Quản trị hệ thống":{},
            "Tin học văn phòng":{},
            "Lập trình":{}
        }
    ],
    },
    {
        "ĐẠI HỌC":[
        {
            "Các môn Đại Cương":{},
            "Quản trị - Marketing":{},
            "Kinh tế - Thương mại":{},
            "Tài chính - Ngân hàng":{}
        },
        {
            "Kế toán - Kiểm toán":{},
            "Khoa học kỹ thuật":{},
            "Xã hội nhân văn":{},
            "Luật - Môn khác":{}
        }
    ]
    },
    {
        "ADMIN":[
            {
                "Quản lý đề thi":
                {
                    "href":"/Quan_Ly_Exam"
                },
            },
            {
                "Quản lý người dùng":
                {
                    "href":"/Quan_Ly_User"
                },
            }
        ]
    }
]


const Header = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const navigate = useNavigate();

    const nameUser = localStorage.getItem('name')

    const handleNavigate = (id) => {
        // Sử dụng navigate để chuyển hướng và truyền id qua tham số URL
        navigate(`/Login`);
      };
  

    
    return (
        <>
            <div id="box-header">
                <div id="logo">
                    {/* <img src="src/assets/images/logo_1.png" alt=""/> */}
                    <Link to="/">
                        <div id='logo-content'></div>
                    </Link>
                </div>
                
                {/* <nav id="box-nav">
                    {categorizedData.map((categoryGroup, index) => (
                        <div  className={`nav-list nav-${index}`}>
                            {Object.keys(categoryGroup).map((category, key) => (
                                <div className="nav-list-item">
                                    <a href=""><p>{category}</p></a>
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </nav> */}
                <nav id="box-nav">
                    {categorizedData.map((categoryGroup, index) => (
                        <div className={`nav-list nav-${index}`} key={index}>
                            {Object.keys(categoryGroup).map((category, key) => (
                                <div
                                    className="nav-list-item"
                                    key={key}
                                    onMouseEnter={() => setHoveredCategory(category)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    <a className='list-item' href="">
                                        <p>{category}</p>
                                    </a>

                                    
                                    {/* {hoveredCategory === category && (
                                        <div className="category-content">
                                           <table>
                                                <tbody>
                                                    {categoryGroup[category].map((items) => (
                                                        <tr>
                                                            {items.map((item)=>(
                                                                <td>{item}</td>
                                                            ))}
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                    )} */}
                                    {hoveredCategory === category && (
                                        <div className="category-content">
                                            <table>
                                            <tbody>
                                                {categoryGroup[category].map((subCategories, subIndex) => (
                                                <tr key={subIndex}>
                                                    {Object.keys(subCategories).map((subCategory, itemIndex) => (
                                                    <td key={itemIndex}>
                                                        <Link className='Item' to={subCategories[subCategory].href}>
                                                            {subCategory}
                                                        </Link>
                                                    </td>
                                                    
                                                    ))}
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                        </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    ))}
                </nav>

                <div id="login-logout" onClick={handleNavigate}>
                    <div className="login">
                    {nameUser ? (
                        // Nếu nameUser tồn tại, hiển thị tên người dùng
                        <a href="">
                            {nameUser}
                        </a>
                    ) : (
                        // Ngược lại, hiển thị nút "Đăng Nhập"
                        <a href=''>
                            Đăng Nhập
                        </a>
                    )}
                        </div>
                </div>
            </div>
        </>
    );
};


export { categorizedData };

export default Header;