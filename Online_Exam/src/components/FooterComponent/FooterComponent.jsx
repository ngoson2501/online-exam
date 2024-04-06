
/* import './FooterStyle.css' */
import './FooterStyle.css'

/* type Topic = {
    title: string,
    topic_1:string,
    topic_2:string,
    topic_3:string
} */


const listOptions = [
    {       
        title:"THI THPT QG",
        topic_1:"Môn Toán-Văn-Anh",
        topic_2:"Môn Lý-Hóa-Sinh",
        topic_3:"Môn Sử-Địa-GDCD"
    },
    {   
        title:"ĐỀ KIỂM TRA",
        topic_1:"Đề thi HK1, HK2",
        topic_2:"Kiểm tra 1 tiết",
        topic_3:"Kiểm tra 15 phút"
    },
    {   title:"ENGLISH_TEST",
        topic_1:"Ngữ pháp tiếng Anh",
        topic_2:"Từ vựng tiếng Anh",
        topic_3:"Tiếng Anh THPT QG"
    },
    {   
        title:"IT TEST",
        topic_1:"Tin học văn phòng",
        topic_2:"Lập trình Web/App",
        topic_3:"Quản trị hệ thống"
    },
    {   
        title:"ĐẠI HỌC",
        topic_1:"Môn đại cương",
        topic_2:"Chuyên ngành kinh tế",
        topic_3:"Chuyên ngành kỹ thuật"
    }


]


function Footer() {
    return (
      <>
        <div id='box-footer'>
            <div id="box-logo-footer">
                <img src="/src/assets/images/logo_2.png" alt=""/>
            </div>
            <ListOptionsFooter />
            <div id="address-info">
                <div id="info-footer-1">
                    <p>
                        <strong>Chịu trách nhiệm nội dung:</strong>
                    </p>
                    <p>
                        Nguyễn Công Hà - Giám đốc Công ty TNHH TÀI LIỆU TRỰC TUYẾN VI NA
                    </p>
                    
                </div>
                <div id="info-footer-2">
                    <p><strong>LIÊN HỆ</strong></p>
                    <p>Địa chỉ: P402, 54A Nơ Trang Long, Phường 14, Q.Bình Thạnh, TP.HCM</p>
                    <p>Hotline: 0933030098</p>
                    <p>Email: support@tailieu.vn</p>
                </div>
                
               
            </div>
            <p>Copyright 2022 by tracnghiem.net</p>
        </div>
      </>
    );
  }
  
export default Footer;




function ListOptionsFooter() {
    return (
      <div id='nav-list-footer'>
        {listOptions.map(function (option, key) {
          return (
            <div key={key} className='list-options'>
                <table>
                    <tr>
                        <td className='first-child'><a href="">{option.title}</a></td>
                    </tr>
                    <tr>
                        <td><a href="">{option.topic_1}</a></td>
                    </tr>
                    <tr>
                        <td><a href="">{option.topic_2}</a></td>
                    </tr>
                    <tr>
                        <td><a href="">{option.topic_3}</a></td>
                    </tr>
                </table>
            </div>
          );
        })}
      </div>
    );
  }
  

