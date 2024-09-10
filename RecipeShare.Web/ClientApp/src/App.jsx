import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import AddRecipe from './Pages/AddRecipe';
import { AuthComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import LogOut from './Pages/LogOut';
import RecipesByUser from './Pages/RecipesByUser';

const App = () => {
    return (
        <AuthComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/categories' element={<PrivateRoute><Categories /></PrivateRoute>} />
                    <Route path='/addrecipe' element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
                    <Route path='/allbyuser' element={<PrivateRoute><RecipesByUser /></PrivateRoute>} />
                    <Route path='/logout' element={<PrivateRoute><LogOut /></PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthComponent>
    );
}

export default App;