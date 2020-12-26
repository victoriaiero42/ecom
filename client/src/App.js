import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import ForgotPassword from '../src/pages/auth/ForgotPassword';
import RegisterComplete from './pages/auth/RegisterComplete';
import { LOGGED_IN_USER } from './redux/actionTypes';
import UserRoute from './components/Routs/UserRoute';
import AdminRoute from './components/Routs/AdminRoute';
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashbord from './pages/admin/AdminDashbord';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCreate from './pages/admin/sub/SubCreate';
import SubUpdate from './pages/admin/sub/SubUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import AllProducts from './pages/admin/product/AllProducts';

import { auth } from './firebase1';
import { useDispatch } from 'react-redux';
import { currentUser } from './fucns/auth';
// import { createOrUpdateUser } from './fucns/auth';
import History from './pages/user/History';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then(
            res => {
              dispatch({
                type: LOGGED_IN_USER,
                payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                },
              });
            }
          )
          .catch(err => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path='/login' component={ Login } />
        <Route exact path='/register/complete' component={ RegisterComplete } />
        <Route exact path='/register' component={ Register } />
        <Route exact path='/forgot/password' component={ ForgotPassword } />
        <UserRoute exact path='/user/history' component={ History } />
        <UserRoute exact path='/user/password' component={ Password } />
        <UserRoute exact path='/user/wishlist' component={ Wishlist } />
        <AdminRoute exact path='/admin/dashboard' component={ AdminDashbord } />
        <AdminRoute exact path='/admin/category' component={ CategoryCreate } />
        <AdminRoute exact path='/admin/category/:slug' component={ CategoryUpdate } />
        <AdminRoute exact path='/admin/sub/:slug' component={ SubUpdate } />
        <AdminRoute exact path='/admin/sub' component={ SubCreate } />
        <AdminRoute exact path='/admin/product' component={ ProductCreate } />
        <AdminRoute exact path='/admin/product/:slug' component={ ProductUpdate } />
        <AdminRoute exact path='/admin/products' component={ AllProducts } />

        <Route exact path='/' component={ Home } />

      </Switch>
    </>
  );
}

export default App;
