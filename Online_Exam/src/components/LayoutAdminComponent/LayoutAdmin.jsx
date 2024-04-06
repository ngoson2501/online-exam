import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Header from "../HeaderComponent/HeaderComponent"
import Footer from "../FooterComponent/FooterComponent"
import SideBarNavigation from "../SideBarComponent/SideBarNavigation";

import './Style.css'



const LayoutAdmin = ()=>{
    

    return(<>
            
            <div className="box-content-side-bar">
                <div className="box-side-bar">
                    <SideBarNavigation></SideBarNavigation>
                </div>
                <div className="content-main">
                    <Header></Header>
                    <Outlet/>
                    <Footer></Footer>
                </div>

            </div>
            
           </>)
}


export default LayoutAdmin