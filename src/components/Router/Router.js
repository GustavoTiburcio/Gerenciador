import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Products from '../../pages/Products/Products';
import Categories from '../../pages/Categories/Categories';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' exact />
                <Route element={<Products />} path='/produtos' />
                <Route element={<Categories />} path='/categorias' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;