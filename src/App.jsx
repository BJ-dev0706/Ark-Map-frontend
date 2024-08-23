import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMap from "./Pages/Map";
import Home from "./Pages/Home";
import Help from "./Pages/Help";
import Navbar from "./component/Navbar";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MyMap />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Navbar />
    </BrowserRouter>
  )
}

export default App;