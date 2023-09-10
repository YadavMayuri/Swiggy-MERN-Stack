import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import { useContext} from 'react';
import { AuthContext } from './Context/AuthContext';
import MultipleProduct from './Components/MultipleProduct';
import SingleProduct from './Components/SingleProduct';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import PageLoader from './Components/PageLoader';
import SuccessPage from './Components/SuccessPage';
import OrderHistory from './Components/OrderHistory';
import AddProduct from './Components/Seller/AddProduct';
import SellerDashboard from './Components/Seller/SellerDashboard';
import SellerAllProducts from './Components/Seller/SellerAllProducts';
import UpdateProduct from './Components/Seller/UpdateProduct';

function App() {
  const { state } = useContext(AuthContext);
  // console.log(state,"state from context")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/addProduct' element={<AddProduct/>}/>
        <Route exact path='/MultipleProduct' element={<MultipleProduct/>}/>
        <Route exact path='/singleProduct/:id' element={<SingleProduct/>}/>
        <Route exact path='/navbar' element={<Navbar/>}/>
        <Route exact path='/footer' element={<Footer/>}/>
        <Route exact path='/cart'element={<Cart/>}/>
        <Route exact path='/pageloader' element={<PageLoader/>}/>
        <Route exact path='/successpage' element={<SuccessPage/>}/>
        <Route exact path='/orderhistory' element={<OrderHistory/>}/>
        <Route exact path='/sellerdashboard' element={<SellerDashboard/>}/>
        <Route exact path='/sellerAllProducts' element={<SellerAllProducts/>}/>
        <Route exact path='/updateproduct/:pId' element={<UpdateProduct/>}/>


      </Routes>
     
    </div>
  );
}

export default App;