import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        {/* Authentication routes */}
        {/* TODO: Handle where user is already logged in, if user is already logged in, do not show login/register pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TODO: Private routes for authenticated users */}
        {/* <Route path="/manage/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/manage/packages" element={<Packages />} /> */}
        {/* <Route path="/manage/packages/:id" element={<PackageDetails />} /> */}
        {/* <Route path="/manage/profile" element={<Profile />} /> */}
        {/* <Route path="/manage/settings" element={<Settings />} /> */}

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
