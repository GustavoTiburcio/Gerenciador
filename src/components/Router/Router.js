import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Produtos from '../../pages/Produtos/Produtos';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/' exact />
                <Route element={<Produtos />} path='/produtos' />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;