import { QuestionCircleOutlined, MenuOutlined, HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { FloatButton, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SelectAuth } from "../redux/authSlice";
import Paragraph from 'antd/es/typography/Paragraph';
import { Logout } from '../services/authService';
 
const Navbar = () => {

    const [userInfoView, SetUserInfoView] = useState(false);
    const UserData = useSelector(SelectAuth);

    const ModalShow = () => {
        SetUserInfoView(!userInfoView)
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
            </Modal>
        </div>
    )
}

export default Navbar;