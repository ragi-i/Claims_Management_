// src/App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import UserLogin from './pages/auth/Userlogin';
import UserRegister from './pages/auth/Userregister';
import Home from './pages/Home';
import YourPolicy from './pages/YourPolicy';
import ClaimHistory from './pages/ClaimHistory';
import AdminRegister from './pages/auth/AdminRegister';
import AdminLogin from './pages/auth/AdminLogin';
import AdminPage from './pages/AdminPage';
import AllPolicy from './pages/AllPolicy';
import ProtectedRoute from './redux/features/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLogin />} />
      <Route path='/userlogin' element={<UserLogin />} />
      <Route path='/userregister' element={<UserRegister />} />
      <Route path='/adminlogin' element={<AdminLogin />} />
      <Route path='/adminregister' element={<AdminRegister />} />
      
      <Route element={<ProtectedRoute redirectTo="/userlogin" />}>
        <Route path='/home' element={<Home />} />
        <Route path='/yourpolicy' element={<YourPolicy />} />
        <Route path='/claimhistory' element={<ClaimHistory />} />
      </Route>
      
      <Route element={<ProtectedRoute redirectTo="/adminlogin" />}>
        <Route path='/adminhome' element={<AdminPage />} />
        <Route path='/adminpolicy' element={<AllPolicy />} />
      </Route>

      <Route path='*' element={<UserLogin />} />
    </Routes>
  );
}

export default App;
