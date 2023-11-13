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
import DisplayCart from "./component/cart/DisplayCart";

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
          <Route path={'/cart/account/:id'} element={<DisplayCart/>}></Route>
      </Routes>
  </BrowserRouter>
);

