import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home.jsx';
import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import App from './App.jsx';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PrivateRoute } from './components/PrivateRoute.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </App>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
