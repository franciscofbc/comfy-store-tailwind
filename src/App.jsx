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
import { loader as loaderOrders } from './pages/Orders';
import { action as actionRegister } from './pages/Register';
import { action as actionLogin } from './pages/Login';
import { action as actionCheckout } from './components/CheckoutForm';
import { store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        loader: loaderLanding(queryClient),
      },
      { path: 'about', element: <About /> },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: loaderProducts(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: loaderSingleProduct(queryClient),
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: loaderCheckout(store),
        action: actionCheckout(store, queryClient),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: loaderOrders(store, queryClient),
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
