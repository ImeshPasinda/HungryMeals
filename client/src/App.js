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
import UserProfilescreen from './screens/UserProfilescreen';
import FeedbackScreen from './screens/Feedbackscreen';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar />


      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="/feedback" exact element={<FeedbackScreen />} />
          <Route path="/profile" exact element={<UserProfilescreen />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
