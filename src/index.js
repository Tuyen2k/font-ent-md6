import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import {ToastContainer} from "react-toastify";
import Login from "./component/Login";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<>
              {/*<ToastContainer position="top-right" autoClose={2000} pauseOnHover={false}/>*/}
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
          <Route path={'/login'} element={<Login/>}></Route>
      </Routes>
  </BrowserRouter>
);

