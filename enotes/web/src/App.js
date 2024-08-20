import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Navbar from './components/NavLayout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import { NoteContextProvider } from './context/NoteContext.js';
import { NoteFormContextProvider } from './context/NoteFormContext.js';
import { AuthContextProvider } from './context/AuthContext.js';

const AppLayout = () => {
  return (
    <AuthContextProvider>
      <NoteContextProvider>
        <NoteFormContextProvider>
          <Navbar />
          <Outlet />
        </NoteFormContextProvider>
      </NoteContextProvider>
    </AuthContextProvider>
  );
};

const appRouter = createBrowserRouter([{
  path: '/',
  element: <AppLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signUp',
      element: <SignUp />
    }
  ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
