import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMap from "./Pages/Map";
import Home from "./Pages/Home";
import Help from "./Pages/Help";
import Navbar from "./component/Navbar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PasswordReset from "./Pages/Password-reset";
import {jwtDecode} from "jwt-decode";
import store from "./redux/store";
import { SetUserData } from "./redux/authSlice";
import Manager from "./Pages/Manager";

if (localStorage.getItem('token')) {
  let token = localStorage.getItem('token');
  let temp = jwtDecode(token);    
  store.dispatch(SetUserData(temp));
}


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MyMap />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App;