import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Ordersscreen from './screens/Ordersscreen';
import Profilescreen from './screens/user/Profilescreen';
import FeedbackScreen from './screens/Feedbackscreen';
import Footer from './components/Footer';
import AdminProfilescreen from './screens/AdminProfilescreen';
import Adminloginscreen from './screens/Adiminloginscreen';
import { useSelector } from 'react-redux';
import Notificationmanagementscreen from './screens/Notificationmanagementscreen';
import Errorscreen from './screens/Errorscreen';
import AboutScreen from './screens/Aboutscreen';
import FAQScreen from './screens/FAQscreen';
import Customermanagementscreen from './screens/Customermanagementscreen';
import Feedbackmanagementscreen from './screens/Feedbackmanagementscreen';
import Detailsscreen from './screens/user/Detailsscreen';
import Ordermanagementscreen from './screens/Ordermanagementscreen';



function App() {

  const userstate = useSelector(state => state.loginUserReducer)
  const { currentUser } = userstate
  const adminloginstate = useSelector(state => state.adminloginReducer)
  const { currentAdmin } = adminloginstate

  return (
    <div className="App">


      <Navbar />


      <BrowserRouter>
        <Routes>



          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/admin/login" exact element={<Adminloginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/orders" exact element={<Ordersscreen />} />


          {currentUser ? (
            <Route path="/feedback" exact element={<FeedbackScreen />} />

          ) : (


            <Route path="/feedback" exact element={<FeedbackScreen />} />

          ) && currentAdmin ? (<Route path="/error" exact element={<Errorscreen />} />) : (

            <Route path="/feedback" exact element={<FeedbackScreen />} />


          )}

          {currentAdmin ? (<Route path="admin/notifications" exact element={<Notificationmanagementscreen />} />) : (

            <Route path="/error" exact element={<Errorscreen />} />

          )}
          {currentAdmin ? (<Route path="admin/orders" exact element={<Ordermanagementscreen />} />) : (

            <Route path="/error" exact element={<Errorscreen />} />

          )}


          {currentAdmin ? (<Route path="admin/customers" exact element={<Customermanagementscreen />} />) : (

            <Route path="/error" exact element={<Errorscreen />} />

          )}
          {currentAdmin ? (<Route path="admin/feedback" exact element={<Feedbackmanagementscreen />} />) : (

            <Route path="/error" exact element={<Errorscreen />} />

          )}


          <Route path="/profile" exact element={<Profilescreen />} />
          <Route path="/profile/details" exact element={<Detailsscreen />} />
          <Route path="/admin" exact element={<AdminProfilescreen />} />
          <Route path="/about" exact element={<AboutScreen />} />
          <Route path="/faq" exact element={<FAQScreen />} />




        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
