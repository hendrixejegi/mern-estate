import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home.jsx';
import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </App>
  </BrowserRouter>,
);
