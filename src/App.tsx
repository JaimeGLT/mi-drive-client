import './App.css'
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import VerifyMail from './pages/forgotPassword/VerifyMail';
import ChangePassword from './pages/forgotPassword/ChangePassword';
import { Toaster } from 'react-hot-toast';
import MyDrive from './pages/myDrive/MyDrive';
import PublicFiles from './pages/PublicFiles/PublicFiles';
import SideBar from './components/SideBar';
import DestacadoPage from './pages/destacados/DestacadoPage';
import RecientesPage from './pages/recientes/RecientesPage';

function AppContent() {
    const location = useLocation();

    
    // Rutas sin navbar
    const authRoutes = ['/login', '/register', '/forgot-password', '/verify-mail', '/change-password'];
    const isAuthRoute = authRoutes.includes(location.pathname);

    if (isAuthRoute) {
        return (
        <div className="auth-layout">
            <Routes>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/register' element={<RegisterPage />}/>
                <Route path="/forgot-password" element={<ForgotPassword />}/>
                <Route path="/verify-mail" element={<VerifyMail />}/>
                <Route path="/change-password" element={<ChangePassword />}/>
            </Routes>
        </div>
        );
    }

    return (
        <div className="app-layout">
        {/* <NavBar title={title} /> */}
        
        <div className="main-container">
            <SideBar />
            
            <main className="content">
            <Routes>
                <Route path='/' element={<PublicFiles/>}/>
                <Route path='/mi-drive' element={<MyDrive />}/>
                <Route path='/destacados' element={<DestacadoPage/>}/>
                <Route path='/recientes' element={<RecientesPage/>}/>
            </Routes>
            </main>
        </div>
        </div>
    );
    }

    function App() {
    return (
        <BrowserRouter>
        <Toaster 
            position="top-right"
            reverseOrder={false}
            toastOptions={{
            duration: 4000,
            style: {
                background: '#333',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
            },
            }}
        />
        <AppContent />
        </BrowserRouter>
    )
    }

    export default App