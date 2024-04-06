
import './DocumentStyle.css'

const listDocument = [
    {       
        cover:"src/assets/images/images_document/906_1599817514.jpg",
        describe:"Lý thuyết công nghệ lớp 12 đầy đủ và chi tiết"
        
    },
    {   
        cover:"src/assets/images/images_document/259_1599814381.jpg",
        describe:"Soạn văn lớp 12 tập 1 và tập 2 siêu ngắn và hay nhất"
    },
    {    
        cover:"src/assets/images/images_document/66_1599817835.jpg",
        describe:"Lý thuyết vật lý lớp 12 theo chuyên đề và bài học"
    },
    {   
        cover:"src/assets/images/images_document/997_1599814641.jpg",
        describe:"Hướng dẫn giải SGK, SBT và nâng cao sinh học 12"
    },
    {   
        cover:"src/assets/images/images_document/204_1599816027.jpg",
        describe:"Lý thuyết địa lý lớp 12 đầy đủ theo chuyên đề"
    },
    {   
        cover:"src/assets/images/images_document/289_1599814417.jpg",
        describe:"Tổng hợp các kiến thức toán trọng tâm trong SGK"
    },
    {   
        cover:"src/assets/images/images_document/529_1599818051.jpg",
        describe:"Tổng hợp lý thuyết kiến thức hóa vô cơ"
    },
    {   
        cover:"src/assets/images/images_document/642_1599814984.jpg",
        describe:"Hướng dẫn giải SBT và các kiến thức căn bẳn trong SGK"
    },
    {   
        cover:"src/assets/images/images_document/852_1599814579.jpg",
        describe:"Hướng dẫn giải SBT, SGK môn hóa lớp 12"
    },
    {   
        cover:"src/assets/images/images_document/706_1599816778.jpg",
        describe:"Hệ thống hóa kiến thức lịch sử lớp 12"
    },
    {   
        cover:"src/assets/images/images_document/953_1599817409.jpg",
        describe:"Lý thuyết tin học lớp 12 đầy đủ và chi tiết"
    },
    {   
        cover:"src/assets/images/images_document/913_1599817737.jpg",
        describe:"Tổng hợp kiến thức toán hình lớp 12"
    }


]



function Document (){
    return(
        <>
            <div id="box-document">
                <h2><p>TÀI LIỆU THAM KHẢO</p></h2>
                <div id="list-documents">
                    
                    {
                        listDocument.map(function(document,key){
                            return (<>
                                       <div key={key} className="document">
                                            <a href="#">
                                                <img src={document.cover} alt=""/>
                                                <p>{document.describe}</p>
                                            </a>
                                        </div>
                                   </>)
                        })
                    }
                
                </div>

            </div>
        </>
    )
}

export default Document