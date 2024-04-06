import { createContext, useContext } from 'react';

import { useCheckLogin } from '../../hook/useCheckLogin';
import styled from "styled-components"
import './HomeStyle.css';
import Slider from '../../components/Slider/Slider';
import Document from '../../components/DocumentComponent/DocumentComponent';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Admin/UserManagementComponent/Context';



const HomeComponent = ()=>{
    
    

    return(<>
                
                <ContentHomePage >
                    <Slider></Slider>
                    <Banner></Banner>
                    <FeatuedContent></FeatuedContent>
                    <a href="">
                        <img src="https://ads.zunia.vn/www/images/6034644b19c29c0c5de7f6491893c2b8.webp" alt="" />
                    </a>
                    <div className='banner-exam-english'>
                        <div className='box-cont-banner-exam-english'>
                            <h2>Trắc nghiệm Tiếng Anh</h2>
                            <p>Tổng hợp hàng ngàn câu trắc nghiệm Tiếng Anh Online và các đề thi chứng chỉ quốc tế TOEIC,
                                TOEFL, IELTS giúp các bạn ôn luyện và đạt điểm tốt trong các kỳ thi Tiếng Anh.
                            </p>
                            <a href="" className="btn-orange">Làm ngay</a>
                        </div>

                    </div>

                    <SmartTesting></SmartTesting>

                    <Document></Document>



                </ContentHomePage>
                
           </>)
}



const Banner = ()=>{
    return(<>
                <div className="banner">
                    <div className="middle">
                        <h1>TRẮC NGHIỆM ONLINE 1</h1>
                        <p>ĐA DẠNG - THÔNG MINH - CHÍNH XÁC</p>
                    </div>
                </div>
           </>)
}





const Context = createContext()

const FeatuedContent = ()=>{
    const resourcesList = 
    [
        {
            "img":"src/assets/images/feature1.jpg",
            "title":"ĐỀ THI HỌC KỲ",
            "description":"Ngân hàng câu hỏi đầy đủ các môn cấp 1,2,3 được trộn tạo đề theo cấu trúc phân loại giúp các em dễ dàng ôn tập online đề thi giữa học kỳ, thi học kỳ theo các chủ đề đã học."
        },
        {
            "img":"src/assets/images/feature2.jpg",
            "title":"ĐỀ THI THPT QG",
            "description":"Tổng hợp đề thi trắc nghiệm online THPT QG của các môn Toán, Tiếng Anh, Vật lý, Hóa học, Sinh học, Địa lý, Lịch sử, GDCD kèm đáp án và lời giải chi tiết."
        },
        {
            "img":"src/assets/images/feature3.jpg",
            "title":"ĐỀ KIỂM TRA",
            "description":"Hệ thống bài kiểm tra 1 tiết, kiểm tra 15 phút được thiết kế theo hình thức trắc nghiệm online giúp học sinh có thể tạo ra đề tự luyện tập và chấm điểm trực tuyến."
        }
    ]
    return(<>
                <div className="featued-list">
                    <Context.Provider value={resourcesList}>
                        <Featued></Featued>
                    </Context.Provider>
                </div>
           </>)
}



const Featued = ()=>{
    const resourcesList = useContext(Context)
    
    return(<>
                {resourcesList.map(resource =>(
                    <div className="featued">
                        <div className="img">
                            <img src={resource.img} alt="featued-img" />
                        </div>
                        <h3>{resource.title}</h3>
                        <p>
                            {resource.description}
                        </p>
                        <a href="#" className="btn-orange">Làm ngay</a>
                    </div>
                ))}
           </>)
}




const SmartTesting = ()=>{
    return(<>

            <dir className='smart-testing'>
                    <h2>
                        TẮC NGHIỆM THÔNG MINH
                    </h2>
                <div className='content-smart-testing'>
                    <div>
                        <div className='img'>
                            <img src="src/assets/images/smart1.png" alt="" />
                        </div>
                        <p className='title'>Đa dạng nội dung</p>
                        <p>Cung cấp đa dạng nội dung các câu hỏi trắc nghiệm thuộc nhiều lĩnh vực khác nhau</p>
                    </div>
                    
                    <div>
                        <div className='img'>
                            <img src="src/assets/images/smart2.png" alt="" />
                        </div>
                        <p className='title'>Ma trận câu hỏi</p>
                        <p>Hệ thống sẽ dựa vào ma trận câu hỏi phong phú để tự tổng hợp thành đề trắc nghiệm</p>
                    </div>
                    
                    <div>
                        <div className='img'>
                            <img src="src/assets/images/smart3.png" alt="" />
                        </div>
                        <p className='title'>Đáp án chi tiết</p>
                        <p>Sau khi hoàn thành bài kiểm tra trắc nghiệm hệ thống sẽ thông báo số điểm đạt được kèm lời giải chi tiết</p>
                    </div>
                </div>
            </dir>

           </>)
}








export default HomeComponent



const ContentHomePage = styled.div
`
    width: 100%;
    height: auto;
    background-color: white;
    text-align: center;
    font-family: 'Nunito', sans-serif;

`