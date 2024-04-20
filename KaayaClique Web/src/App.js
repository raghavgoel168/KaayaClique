import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Components/LoginAuth';
import Dashboard from './UserProtectedRoutes/Dashboard';
import Error from './Components/Error';
import About from './Pages/About';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import SignUp from './Components/SignUp';
import PrivateRoute from './Components/Routes/PrivateRoute';
import AdminRoute from './Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import DisplayUsers from './Pages/Admin/DisplayUsers';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';
import DisplayProducts from './Pages/Admin/DisplayProducts';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Landing from './Pages/Landing';
import Cart from './Pages/User/Cart';
import SearchProduct from './Pages/SearchProduct';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryWiseProduct from './Pages/CategoryWiseProduct';
import Payment from './Pages/Payment';
import AdminOrders from './Pages/Admin/AdminOrders';
function App() {
  return (
    <Router>
    <Header/>
    <Routes>
    <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryWiseProduct />} />
      <Route path="/product/:slug" element={<ProductDetails/>} />
      <Route path="/search" element={<SearchProduct/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Orders/>} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute />} >
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />}/>
        <Route path="admin/create-products" element={<CreateProduct />}/>
        <Route path="admin/product/:slug" element={<UpdateProduct />}/>
        <Route path="admin/orders" element={<AdminOrders />}/>
        <Route path="admin/products" element={<DisplayProducts />}/>
        <Route path="admin/display-users" element={<DisplayUsers />}/>

      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<SignUp/>} />
      <Route path="/paymentpage" element={<Payment/>} />
      <Route path="*" element={<Error/>} />
    </Routes>
    <Footer/>
  </Router>
 
    
   
  );
}

export default App;
