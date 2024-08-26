
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"
import { Button, notification } from 'antd';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const temp = await signin(email, password);
            temp === "manager" ? 
                navigate('/manager')    
                :
                navigate('/map')
        } catch (err) {
            console.log(err);
                notification.error({
                    message: 'Login Failed',
                    description: `${err.response.data && err.response.data.message ? err.response.data.message : "An unexpected error occurred. Please try again." }`,
                });
        }
    };
    return(
        <main className="flex min-h-screen flex-row items-center justify-center bg-[url(./assets/bg1.jpg)] bg-cover bg-no-repeat">
            <div className="xl:w-1/3 w-2/3 max-lg:w-full bg-[#fde9dfe5] flex flex-col items-center justify-center shadow-lg rounded-lg px-10 py-20">
                <img src={logo} alt="" className=" w-1/4 my-5" />
                <form onSubmit={handleSubmit} className="space-y-6 w-3/4 mx-auto">
                    <div className='py-2'>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input placeholder="input email" onChange={e => setEmail(e.target.value)} value={email} required
                                className="peer h-full w-full border-b border-indigo-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                            <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-indigo-600 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-indigo-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-indigo-600 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-indigo-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-indigo-600">
                            Email
                            </label>
                        </div>
                    </div>

                    <div className='py-2'>
                        <div className="relative h-11 w-full min-w-[200px]">
                            <input placeholder="input password" onChange={e => setPassword(e.target.value)} value={password} required type='password'
                                className="peer h-full w-full border-b border-indigo-400 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-indigo-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                            <label
                            className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-indigo-600 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-indigo-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-indigo-600 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-indigo-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-indigo-600">
                            Password
                            </label>
                        </div>
                        <div className='text-right pt-5'>
                            <Link to={"/reset"}><Button type='link'>Forget Password</Button></Link>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className="relative flex items-center px-7 py-2 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group" type='submit'>
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Sign In</span>
                        </button>
                    </div>
                </form>
                
                <div className="pt-10 pb-3">
                    {"Don't have an account?"}  <Link to={"/signup"} className="text-indigo-600 hover:color-indigo-500">Sign up</Link>
                </div>
            </div>
        </main>
    )
}

export default SignIn;