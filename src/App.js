import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IntroPage, LoadingPage, SignupPage,LocationPage, LoginPage, Dashboard, Seemore, SearchPage, Expandpage, CartPage,CheckoutPage, AddressPage,Checkout, Orderplace ,Notification, EmptyNotification, ChatPage, Profile, ProductDetail, FarmChat, FarmerSignupPage, Orders, Wishlist, FarmerProductsList, FarmerDash, FarmerExpandPage, FarmerProfile, FarmerOrders, FarmerChatPage, FarmerAddDetails, SearchResultsPage, FarmerProductsEdit, ProfileEdit} from './containers';
import { AuthProvider } from './components/Auth/AuthContext';
import { Header } from './components';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<LoadingPage />} />
          <Route path="/introduction" exact element={<IntroPage />} />
          <Route path="/signup" exact element={<SignupPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/location" exact element={<LocationPage/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
          <Route path="/seemore" exact element={<Seemore/>} />
          <Route path="/search" exact element={<SearchPage/>} />
          <Route path="/search-results" exact element={<SearchResultsPage/>} />
          <Route path="/expand/:product_id" exact element={<Expandpage/>} />
          <Route path="/cart" exact element={<CartPage/>} />
          <Route path="/checkoutpage" exact element={<CheckoutPage/>}/>
          <Route path="/address" exact element={<AddressPage/>}/>
          <Route path="/checkout" exact element={<Checkout/>}/>
          <Route path="/ordersuccess" exact element={<Orderplace/>}/>
          <Route path="/notification" exact element={<Notification/>}/>
          <Route path="/profile" exact element={<Profile/>}/>
          <Route path="/profileedit" exact element={<ProfileEdit/>}/>
          <Route path="/nonotification" exact element={<EmptyNotification/>}/>
          <Route path="/chat" exact element={<ChatPage/>} />
          <Route path="/farmerdashboard" exact element={<FarmerDash/>}/>
          <Route path="/addproduct" exact element={<ProductDetail/>}/>
          <Route path="/farmerchat" exact element={<FarmerChatPage/>}/>
          <Route path="/Farmersignup" exact element={<FarmerSignupPage />} />
          <Route path="/farmerproductlist" exact element={<FarmerProductsList/>}/>
          <Route path='/orders' exact element={<Orders/>}/>
          <Route path='/wishlist' exact element={<Wishlist/>}/>
          <Route path="/farmerexpand/:product_id" exact element={<FarmerExpandPage/>} />
          <Route path='/farmerprofile' exact element={<FarmerProfile/>} />
          <Route path='/farmerorders' exact element={<FarmerOrders/>} />
          <Route path='/farmeradddetails' exact element={<FarmerAddDetails/>} />
          <Route path="/productsedit/:product_id" exact element={<FarmerProductsEdit/>} />
        </Routes>
      </Router>
    </AuthProvider>

  );
};

export default App;


