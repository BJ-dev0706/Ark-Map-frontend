import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMap from "./Pages/Map";
import Home from "./Pages/Home";
import Help from "./Pages/Help";
import Navbar from "./component/Navbar";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import {jwtDecode} from "jwt-decode";
import store from "./redux/store";
import { SetUserData } from "./redux/authSlice";
import Manager from "./Pages/Manager";
import { useEffect, useState } from "react";
import NotFound from "./Pages/NotFound";

if (localStorage.getItem('token')) {
  let token = localStorage.getItem('token');
  let temp = jwtDecode(token);    
  store.dispatch(SetUserData(temp));
}


const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const loadResources = async () => {
      for (let i = 0; i <= 100; i++) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      setLoading(false);
    };

    loadResources();
  }, []);
  if (loading) {
    return(
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1 w-1/2">
          <div className="relative h-6 flex items-center justify-center">
            <div className={`absolute top-0 bottom-0 left-0 rounded-lg !bg-green-200`} style={{width: `${progress}%`}}></div>
            <div className="relative text-green-900 font-medium text-sm">{progress}%</div>
          </div>
        </div>
        <div className="my-5">Loading...</div>
      </div>
    )
  }
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MyMap />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App;