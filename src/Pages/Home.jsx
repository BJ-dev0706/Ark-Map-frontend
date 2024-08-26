import { Carousel } from "antd";
// import {
//   MenuOutlined
// } from '@ant-design/icons';
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.png";
import { Link } from "react-router-dom";
import PlayBtn from "../component/PlayBtn";
import ProgressiveImage from 'react-progressive-graceful-image';

const Home = () => {
    return(
        <div className="w-full min-h-screen">
            <Carousel autoplay autoplaySpeed={2500} className="relative">
                <div>
                    <ProgressiveImage src={bg1} placeholder="">
                        {(src, loading) => (
                            <img
                                style={{ filter: loading ? 'blur(10px)' : 'none' }}
                                src={src}
                                alt="Slide 1"
                                className="w-full h-screen"
                            />
                        )}
                    </ProgressiveImage>
                </div>
                <div>
                    <ProgressiveImage src={bg2} placeholder="">
                        {(src, loading) => (
                            <img
                                style={{ filter: loading ? 'blur(10px)' : 'none' }}
                                src={src}
                                alt="Slide 1"
                                className="w-full h-screen"
                            />
                        )}
                    </ProgressiveImage>
                </div>
                <div>
                    <ProgressiveImage src={bg3} placeholder="">
                        {(src, loading) => (
                            <img
                                style={{ filter: loading ? 'blur(10px)' : 'none' }}
                                src={src}
                                alt="Slide 1"
                                className="w-full h-screen"
                            />
                        )}
                    </ProgressiveImage>
                </div>
                <div>
                    <ProgressiveImage src={bg4} placeholder="">
                        {(src, loading) => (
                            <img
                            style={{ filter: loading ? 'blur(10px)' : 'none' }}
                            src={src}
                            alt="Slide 1"
                            className="w-full h-screen"
                            />
                        )}
                    </ProgressiveImage>
                </div>
            </Carousel>
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 ">
                <Link to={"/signin"}>
                    <PlayBtn />
                </Link>
            </div>
        </div>
    )
}

export default Home;