import { createBrowserRouter } from 'react-router'
import { HomePage } from '../pages/HomePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'
import { ProductsPage } from '../pages/ProductsPage.tsx'
import { DetailsPage } from '../pages/DetailsPage.tsx'
import { AboutUsPage } from '../pages/AboutUsPage.tsx'
import { ContactUsPage } from '../pages/ContactUsPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/vehicles',
    element: <ProductsPage />,
  },
  {
    path: '/details/:id',
    element: <DetailsPage />,
  },
  {
    path: '/details',
    element: <DetailsPage />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
  {
    path: '/contacts',
    element: <ContactUsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
