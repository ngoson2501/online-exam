import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";




import './LayoutStyle.css';
import Header from '../HeaderComponent/HeaderComponent.jsx';
import Footer from '../FooterComponent/FooterComponent.jsx';

const Layout = ()=>{
    return(<>
                <Header></Header>
                <Outlet/>
                <Footer></Footer>
           </>)
}


export default Layout;