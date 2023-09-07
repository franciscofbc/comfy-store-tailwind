import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from './pages';
import { ErrorElement } from './components';
import { loader as loaderLanding } from './pages/Landing';
import { loader as loaderSingleProduct } from './pages/SingleProduct';
import { loader as loaderProducts } from './pages/Products';
import { loader as loaderCheckout } from './pages/Checkout';
import { action as actionRegister } from './pages/Register';
import { action as actionLogin } from './pages/Login';
import { action as actionCheckout } from './components/CheckoutForm';

import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: loaderLanding,
      },
      { path: 'about', element: <About /> },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: loaderProducts,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: loaderSingleProduct,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: loaderCheckout(store),
        action: actionCheckout(store),
      },
      {
        path: 'orders',
        element: <Orders />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: actionLogin(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: actionRegister,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
