import { Link } from "react-router-dom";

const Help = () => {
    return(
        <>
            <div className="w-full h-screen bg-[url(./assets/pagebackground2.jpg)] bg-no-repeat bg-center bg-[#555]"></div>
            <Link to={"https://discord.com/invite/W8TDWnEVeD"} className="absolute top-5 left-1/2 -translate-x-1/2">
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
                    border-blue-600
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    Join Now
                </button>
            </Link>
        </>
    )
}

export default Help;