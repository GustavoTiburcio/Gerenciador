import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import ProductsRegister from '../../pages/ProductsRegister/ProductsRegister';
import CategoriesRegister from '../../pages/CategoriesRegister/CategoriesRegister';
import TablesRegister from '../../pages/TablesRegister/TablesRegister';
import OrderHistory from '../../pages/OrderHistory/OrderHistory';
import OrderProducts from '../../pages/OrderProducts/OrderProducts';
import Tables from '../../pages/Tables/Tables';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' exact />
                <Route element={<ProductsRegister />} path='/cadastro/produtos' />
                <Route element={<CategoriesRegister />} path='/cadastro/categorias' />
                <Route element={<TablesRegister />} path='/cadastro/mesas' />
                <Route element={<OrderHistory />} path='/historicoVendas' />
                <Route element={<OrderProducts />} path='/produtosVenda' />
                <Route element={<Tables />} path='/mesas' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;