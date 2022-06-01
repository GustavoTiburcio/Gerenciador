import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Products from '../../pages/Products/Products';
import Categories from '../../pages/Categories/Categories';
import Tables from '../../pages/Tables/Tables';
import OrderHistory from '../../pages/OrderHistory/OrderHistory';
import OrderProducts from '../../pages/OrderProducts/OrderProducts';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' exact />
                <Route element={<Products />} path='/produtos' />
                <Route element={<Categories />} path='/categorias' />
                <Route element={<Tables />} path='/mesas' />
                <Route element={<OrderHistory />} path='/historicoVendas' />
                <Route element={<OrderProducts />} path='/produtosVenda' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;