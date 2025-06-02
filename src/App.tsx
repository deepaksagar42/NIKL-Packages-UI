import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAtomValue } from 'jotai';
import { csrfToken } from './state/Auth';
import Dashboard from './pages/Dashboard';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PublicPackageDetails from './pages/PublicPackageDetails';
import ForgotPassword from './pages/ForgotPassword';
import { Footer } from "./components/Footer";

function App() {
  const csrfTokenValue = useAtomValue(csrfToken);
  const isSessionValidCookie = document.cookie.includes('IS_SESSION_VALID');

  const user = isSessionValidCookie ? { csrfToken: csrfTokenValue } : null;

  return (
    
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/package/:id/:version" element={<PublicPackageDetails />} />

        {/* Authentication routes */}
        { !user ?
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
          :
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </>
        }

        {/* Private routes for authenticated users */}
        { user &&
          <>
            <Route path="/manage" element={<Navigate to="/manage/dashboard" replace />} />
            <Route path="/manage/dashboard" element={<Dashboard />} />
            <Route path="/manage/packages" element={<Packages />} />
            <Route path="/manage/packages/:id" element={<PackageDetails />} />
            <Route path="/manage/profile" element={<Profile />} />
            <Route path="/manage/settings" element={<Settings />} />
          </>
        }

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>     
    </BrowserRouter>

    
  )

}

export default App
