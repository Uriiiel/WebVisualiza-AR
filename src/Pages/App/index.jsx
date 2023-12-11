import { Route, Routes, useRoutes, BrowserRouter } from 'react-router-dom';
import { ShoppingCartProvider } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import Register from '../Register';
import Navbar from '../../components/Navbar';
import CheckoutSideMenu from '../../components/CheckoutSideMenu';
import './App.css';
import { AuthProvider } from '../../Context/authContext';
import  HomeVendedor  from "../Vendedor/index";
import  NewPost  from "../Vendedor/NewPost";

const AppRoutes = () => {
  let routes = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/my-order', element: <MyOrder /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: '/my-orders/last', element: <MyOrder /> },
      { path: '/my-orders/:id', element: <MyOrder /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/register', element: <Register /> },
      { path: '/*', element: <NotFound /> },
      { path: '/home-vendedor', element: <HomeVendedor /> },
      { path: '/upload-product', element: <NewPost /> },
    ]
  );

  return routes;
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <Navbar />
          <CheckoutSideMenu />
        </AuthProvider>
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
