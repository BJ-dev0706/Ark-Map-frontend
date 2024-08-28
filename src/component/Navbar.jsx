import { QuestionCircleOutlined, MenuOutlined, HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Collapse, FloatButton, Modal, notification, Tooltip } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectAuth } from "../redux/authSlice";
import Paragraph from 'antd/es/typography/Paragraph';
import { Logout } from '../services/authService';
import { ChangePassword } from '../services/authService';
 
const Navbar = () => {
    const [current_psw, SetCurrentPassword] = useState("");
    const [new_psw, SetNewPassword] = useState("");
    const [confirm_psw, SetConfirmPassword] = useState("");
    const [userInfoView, SetUserInfoView] = useState(false);
    const UserData = useSelector(SelectAuth);

    const ModalShow = () => {
        SetUserInfoView(!userInfoView)
    }

    const handleChangePassword = (e) => {
        console.log(e);
        
        e.preventDefault();
        if (new_psw !== confirm_psw) {
            notification.warning({
                message: "Input error",
                description: "Please confirm password!"
            })
        } else {
            ChangePassword(UserData.id, current_psw, new_psw)
        }
    }

    return(
        <div>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                    insetInlineEnd: 24,
                }}
                icon={<MenuOutlined />}
            >
                <Tooltip title="Home" placement='left'>
                    <Link to={"/"} className='my-5 block'>
                        <FloatButton icon={<HomeOutlined />} />
                    </Link>
                </Tooltip>
                {
                    Object.keys(UserData).length !== 0 &&
                    <Tooltip title="UserInfo" placement='left'>
                        <FloatButton icon={<UserOutlined />} onClick={ModalShow} />
                    </Tooltip>
                }
                <Tooltip title="Help" placement='left'>
                    <Link to={"/help"} className='my-5 block'><FloatButton icon={<QuestionCircleOutlined />} /></Link>
                </Tooltip>
                {
                    Object.keys(UserData).length !== 0 &&
                    <Tooltip title="Log Out" placement='left'>
                        <FloatButton icon={<LogoutOutlined />} onClick={Logout} />
                    </Tooltip>
                }
            </FloatButton.Group>
            <Modal open={userInfoView} footer={null} onCancel={ModalShow}>
                <h1 className='text-2xl text-center py-2'>User Information</h1>
                <div className="relative flex flex-col justify-center overflow-hidden py-6 sm:py-12">
                    <div
                        className="group relative cursor-pointer overflow-hidden px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                        <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-sky-500 transition-all duration-300 group-hover:scale-[10]"></span>
                        <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-sky-500 transition-all duration-300 group-hover:bg-sky-400">
                                <UserOutlined className='text-5xl text-white' />
                            </span>
                            <div
                                className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                                    <p className='text-black text-lg flex items-center justify-center my-2'>
                                        <small className='mr-2'>Email address: </small> <Paragraph copyable className='!mb-0'>{UserData.email}</Paragraph>
                                    </p>
                                    <p className='text-black text-lg flex items-center justify-center my-2'>
                                        <small className='mr-2'>Private ID: </small> <Paragraph copyable className='!mb-0'>{UserData.id}</Paragraph>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-3'>
                    <Collapse>
                        <Collapse.Panel header={<div>Password Reset</div>}>
                            <form onSubmit={handleChangePassword}>
                                <div className="flex flex-col-reverse my-1">
                                    <input
                                        placeholder="Current Password"
                                        className="peer outline-none border pl-2 py-1 duration-500 border-black focus:border-dashed relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                                        type="text"
                                        value={current_psw}
                                        onChange={e => SetCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0"
                                    >Current Password
                                    </span>
                                </div>
                                <div className="flex flex-col-reverse my-1">
                                    <input
                                        placeholder="New Password"
                                        className="peer outline-none border pl-2 py-1 duration-500 border-black focus:border-dashed relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                                        type="password"
                                        value={new_psw}
                                        onChange={e => SetNewPassword(e.target.value)}
                                    />
                                    <span
                                        className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0"
                                    >New Password
                                    </span>
                                </div>
                                <div className="flex flex-col-reverse my-1">
                                    <input
                                        placeholder="Confirm Password"
                                        className="peer outline-none border pl-2 py-1 duration-500 border-black focus:border-dashed relative placeholder:duration-500 placeholder:absolute focus:placeholder:pt-10 focus:rounded-md"
                                        type="password"
                                        value={confirm_psw}
                                        onChange={e => SetConfirmPassword(e.target.value)}
                                    />
                                    <span
                                        className="pl-2 duration-500 opacity-0 peer-focus:opacity-100 -translate-y-5 peer-focus:translate-y-0"
                                    >Confirm Password
                                    </span>
                                </div>
                                <div className='flex items-center justify-center pt-6'>
                                    {
                                        current_psw && new_psw && confirm_psw &&
                                        <Button type='primary' htmlType='submit'>Submit</Button>
                                    }
                                </div>
                            </form>
                        </Collapse.Panel>
                    </Collapse>
                </div>
                {
                    UserData.auth === "manager" &&
                    <Link to={"/map"} className='flex justify-center'>
                        <button className="w-1/2 py-2 bg-white cursor-pointer rounded-3xl border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out">
                            <span className="font-medium text-[#333] group-hover:text-white">Map View(only manager)</span>
                        </button>
                    </Link>
                }
            </Modal>
        </div>
    )
}

export default Navbar;