import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Profile from './pages/Profile.jsx'
import { GlobalUserContext } from './helper/Context.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'

const isAuthenticated = () => {
  return !!localStorage.getItem("user");
}

const thisRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path: '/services',
    element: <Services />,
    errorElement: <ErrorPage />
  },
  {
    element: <ProtectedRoutes isAuthenticated={isAuthenticated} />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <ErrorPage />
      },
    ]
  },
]);

function AppWrapper() {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <GlobalUserContext.Provider value={{ user, setUser: updateUser }}>
      <RouterProvider router={thisRouter} />
    </GlobalUserContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
