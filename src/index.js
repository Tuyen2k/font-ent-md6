import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./layout/Header";
import Home from "./component/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./layout/Footer";
import PopupAppCart from "./layout/PopupAppCart";
import CreateProduct from "./component/CreateProduct";
import UpdateMerchant from "./component/UpdateMerchant";
import ProductList from "./component/ProductList";
import UpdateProduct from "./component/UpdateProduct";
import FormRegister from "./component/CreateMerchant";
import DisplayCart from "./component/cart/DisplayCart";
import CouponList from "./component/CouponList";
import CreateCoupon from "./component/CreateCoupon";
import UpdateCoupon from "./component/UpdateCoupon";
import DetailProduct from "./component/DetailProduct";
import DetailMerchant from "./component/DetailMerchant";
import OderManager from "./component/oderManager/OderManager";
import '@fortawesome/fontawesome-free/css/all.css';
import AllOrders from "./component/oderManager/AllOrders";
import OrderStatistics from "./component/oderManager/OrderStatistics";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<>
                <Header/>
                <Home/>
                <Footer/>
                <PopupAppCart/>
            </>}>
            </Route>
            <Route path="/list" element={<ProductList/>}></Route>
            <Route path="/product/create" element={<CreateProduct/>}></Route>
            <Route path="/product/update/:id" element={<UpdateProduct/>}></Route>
            <Route path={'/merchant/register'} element={<FormRegister/>}></Route>
            <Route path={'/merchant/update/:id'} element={<UpdateMerchant/>}></Route>
            <Route path={'/detailProduct/:id'} element={<DetailProduct/>}></Route>
            <Route path={'/cart/account'} element={<DisplayCart/>}></Route>
            <Route path={'/list_coupon/:id'} element={<CouponList/>}></Route>
            <Route path={'/create_Coupon/:id'} element={<CreateCoupon/>}></Route>
            <Route path={'/update_Coupon/:id'} element={<UpdateCoupon/>}></Route>
            <Route path={'/order-manager/:id'} element={<OderManager/>}></Route>
            <Route path={'/all-order/:id'} element={<AllOrders/>}></Route>
            <Route path={'/order-statistics/:id'} element={<OrderStatistics/>}></Route>
            <Route path={'/detail_merchant/:id'} element={
                <>
                    <DetailMerchant/>
                    <Footer/>
                </>
            }>
            </Route>
        </Routes>
    </BrowserRouter>
)
// =======
// import {ToastContainer} from "react-toastify";
// import Login from "./component/Login";
// import CouponList from "./component/CouponList";
// import CreateCoupon from "./component/CreateCoupon";
// import UpdateCoupon from "./component/UpdateCoupon";
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//       <Routes>
//           <Route path="/" element={<>
//               <Header/>
//               <Home/>
//               <Footer/>
//               <PopupAppCart/>
//           </>}>
//           </Route>
//           <Route path="/list" element={<ProductList/>}></Route>
//           <Route path="/product/create" element={<CreateProduct/>}></Route>
//           <Route path="/product/update/:id" element={<UpdateProduct/>}></Route>
//           <Route path={'/merchant/register'} element={<FormRegister/>}></Route>
//           <Route path={'/merchant/update/:id'} element={<UpdateMerchant/>}></Route>
//           <Route path={'/detailProduct/:id'} element={<DetailProduct/>}></Route>
//           <Route path={'/list_coupon/:id'} element={<CouponList/>}></Route>
//           <Route path={'/create_Coupon/:id'} element={<CreateCoupon/>}></Route>
//          <Route path={'/update_Coupon/:id'} element={<UpdateCoupon/>}></Route>
    //       <Route path={'/detail_merchant/:id'} element={
    //           <>
    //           <DetailMerchant/>
    //               <Footer/>
    //           </>
    //       }>
    //       </Route>
    //   </Routes>
//   </BrowserRouter>
// >>>>>>> 70c31dc9bd1de1b7f200a866ed2f0f1934ee0400
// );

