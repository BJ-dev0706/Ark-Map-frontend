import { Tabs, Row, Col, Card, Image } from "antd";
import { CheckSquareTwoTone, DeleteTwoTone, MinusSquareTwoTone, UnlockTwoTone } from '@ant-design/icons';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsers, setPermission, deleteUser, changePassword, getMaps, deleteMap } from "../services/manageService";
import { SelectManage } from '../redux/manageSlice';
import FileUpload from "../component/FileUpload";
import Loader from "../component/Loading";

const API_URL = process.env.APP_API_URL || 'http://localhost:5500/api';

const Delete = ({id}) => {
    
    return(
        <button
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-2 bg-red-400 hover:bg-red-600"
            onClick={() => deleteMap(id)}
        >
            <svg
                viewBox="0 0 1.625 1.625"
                className="absolute -top-7 fill-white delay-100 group-hover:top-4 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                height="15"
                width="15"
            >
                <path
                    d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"
                ></path>
                <path
                    d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"
                ></path>
                <path
                    d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"
                ></path>
            </svg>
            <svg
                width="16"
                fill="none"
                viewBox="0 0 39 7"
                className="origin-right duration-500 group-hover:rotate-90"
            >
                <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                <line
                    strokeWidth="3"
                    stroke="white"
                    y2="1.5"
                    x2="26.0357"
                    y1="1.5"
                    x1="12"
                ></line>
            </svg>
            <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                <mask fill="white" id="path-1-inside-1_8_19">
                <path
                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                ></path>
                </mask>
                <path
                    mask="url(#path-1-inside-1_8_19)"
                    fill="white"
                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                ></path>
                <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
            </svg>
        </button>
    )
}

const Manager = () => {
    // const dispatch = useDispatch();
    const {Users, Maps} = useSelector(SelectManage);
    useEffect(() => {
        getUsers();
        getMaps();
    }, []);
    
    const items = [
        {
            key: "users",
            label: <span className="text-white">Users</span>,
            children: 
                Object.keys(Users).length !== 0 ? 
                    <div className="flex flex-col mt-10 shadow-2xl">
                        <div className=" overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                                <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
                                    <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="#9CA3AF" strokeOpacity="1.6" strokeLinecap="round" />
                                            <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                            <path d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z" stroke="black" strokeOpacity="0.2" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <input type="text" id="default-search" className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none" placeholder="Search for company" />
                                </div>
                                <div className="overflow-hidden ">
                                    <table className=" min-w-full rounded-xl">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-tl-xl"> No </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> User Email </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Authority </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Permisssion </th>
                                                <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-tr-xl"> Actions </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-300 ">
                                            {
                                                Users.length !== 0 && Users.map((user, index) => (
                                                    <tr className="bg-white transition-all duration-500 hover:bg-gray-50" key={index}>
                                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{index + 1}</td>
                                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {user.email} </td>
                                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {user.auth}</td>
                                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 
                                                            <button className="p-2  rounded-full  group transition-all duration-500  flex item-center opacity-70 hover:opacity-100" onClick={() => setPermission(user._id)}>
                                                                {
                                                                    user.permission ? <span><CheckSquareTwoTone /> Permitted</span> : <span><MinusSquareTwoTone /> Not permitted</span>
                                                                }
                                                            </button>
                                                        </td>
                                                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 flex gap-5"> 
                                                            <button className="p-2 rounded-full  group transition-all duration-500  flex item-center opacity-70 hover:opacity-100" onClick={() => deleteUser(user._id)}>
                                                                <DeleteTwoTone twoToneColor={"#fa0000"} />
                                                            </button>
                                                            <button className="p-2 rounded-full  group transition-all duration-500  flex item-center opacity-70 hover:opacity-100" onClick={() => changePassword(user._id)}>
                                                                <UnlockTwoTone twoToneColor={"#035e00"} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <Loader />
        },
        {
            key: "maps",
            label: <span className="text-white">Maps</span>,
            children: 
                Object.keys(Maps).length !== 0 ? 
                    <div className="mt-10">
                        <Row gutter={16} align={"middle"}>
                            {
                                Maps.length !== 0 && Maps.map((map, index) => (
                                    <Col lg={8} className="my-5" key={index}>
                                        <Card 
                                            title={
                                                <div className="flex justify-between items-center">
                                                    <span>{map.name}</span>
                                                    <span><Delete id={map._id} /></span>
                                                </div>
                                            } 
                                            bordered={false}>
                                            <Image
                                                className="max-lg:!w-full"
                                                src={`${API_URL}${map.path}`}
                                            />
                                        </Card>
                                    </Col>
                                ))
                            }
                            <Col lg={8} className="my-5">
                                <div className="w-full h-full flex items-center justify-center">
                                    <FileUpload />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    :
                    <Loader />
        }, 
        {
            key: "opinion",
            label: <span className="text-white">Opinion</span>,
            children: <Loader />
        }
    ]

    return(
        <div className="w-full bg-[url(./assets/bg4.png)] bg-no-repeat bg-center bg-[#ff7f7f] bg-cover bg-fixed pt-10">
            <div className="bg-[#585858de] p-10 pt-15 rounded-lg shadow-2xl xl:w-3/4 m-auto min-h-screen">
                <Tabs items={items} defaultActiveKey="maps" className="!text-white" />
            </div>
        </div>
    )
}

export default Manager;