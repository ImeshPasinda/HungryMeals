import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import UserProfilescreen from './screens/UserProfilescreen';


function App() {
  return (
    <div className="App">
      <Navbar/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
          <Route path="/login" exact element={<Loginscreen />} />
          <Route path="/register" exact element={<Registerscreen />} />
          <Route path="/orders" exact element={<Ordersscreen />} />
          <Route path="/profile" exact element={<UserProfilescreen />} />
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
