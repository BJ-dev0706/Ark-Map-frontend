import { Carousel } from "antd";
// import {
//   MenuOutlined
// } from '@ant-design/icons';
import bg1 from "../assets/bg1.png";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import { Link } from "react-router-dom";
import PlayBtn from "../component/PlayBtn";

const Home = () => {
    return(
        <div className="w-full min-h-screen">
            <Carousel autoplay autoplaySpeed={2500} className="relative">
                <div>
                    <img src={bg1} alt="" className="w-full h-screen" />
                </div>
                <div>
                    <img src={bg2} alt="" className="w-full h-screen" />
                </div>
                <div>
                    <img src={bg3} alt="" className="w-full h-screen" />
                </div>
                <div>
                    <img src={bg4} alt="" className="w-full h-screen" />
                </div>
            </Carousel>
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 ">
                <Link to={"/map"}>
                    <PlayBtn />
                </Link>
            </div>
        </div>
    )
}

export default Home;