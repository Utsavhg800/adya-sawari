import './resources/global.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';
import {useSelector} from 'react-redux';
import AdminManageBuses from './pages/Admin/AdminManageBuses';
import AdminManageUsers from './pages/Admin/AdminManageUsers';
import BookTicket from './pages/BookTicket';
import React from "react";
import Bookings from "./pages/Bookings";
import BookingList from "./pages/Admin/BookingList";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import Review from './pages/Review'
import AdminReview from './pages/Admin/AdminReview'

function App() {
    const {loading} = useSelector(state => state.alerts)
    return (
        <React.Fragment>
            {loading && <Spinner/>}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/bookings" element={<ProtectedRoute><Bookings/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/book-now/:id" element={<ProtectedRoute><BookTicket/></ProtectedRoute>}/>
                    <Route path="/admin/buses" element={<ProtectedRoute> <AdminManageBuses/> </ProtectedRoute>}/>
                    <Route path="/admin/users" element={<ProtectedRoute> <AdminManageUsers/> </ProtectedRoute>}/>
                    <Route path="/admin/review" element={<ProtectedRoute> <AdminReview/> </ProtectedRoute>}/>
                    <Route path="/admin/bookings" element={<ProtectedRoute> <BookingList/> </ProtectedRoute>}/>
                    <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
                    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
                    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword/></PublicRoute>}/>
                    <Route path="/reset-password/:id" element={<PublicRoute><PasswordResetConfirm/></PublicRoute>}/>
                    <Route path="/review" element={<ProtectedRoute><Review/></ProtectedRoute    >}/>

                    <Route path="*" element={<PageNotFound/>}/>

                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
