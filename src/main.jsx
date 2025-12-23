import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'

const thisRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage name="Shiro" />,
    errorElement: <ErrorPage />
  },
  {
    path : '/about',
    element: <About />,
    errorElement: <ErrorPage />
  },
  {
    path : '/services',
    element: <Services />,
    errorElement: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={thisRouter} />
  </StrictMode>,
)
