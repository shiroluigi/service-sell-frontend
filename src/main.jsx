import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoutes from './ProtectedRoutes.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import Admin from './pages/Admin.jsx'
import Wishlist from './pages/Wishlist.jsx'
import userStore from './helper/store.js'
import { UPDATE_USER } from './helper/storeConstants.js'

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
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/checkout/:serviceId", element: <Checkout /> },
      { path: "/order/:orderId", element: <OrderDetails /> },
      { path: "/admin", element: <Admin />},
      { path: "/wishlist", element: <Wishlist />}
    ]
  },
]);

function AppWrapper() {

  if (localStorage.getItem("user") !== null){
    userStore.dispatch({
      type: UPDATE_USER,
      payload: JSON.parse(localStorage.getItem("user"))
    })
  }

  return (
      <RouterProvider router={thisRouter} />
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
