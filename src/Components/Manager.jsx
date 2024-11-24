import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordsArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/Visibility-off.png")) {
            ref.current.src = "icons/Visibility-icon.png"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "icons/Visibility-off.png"
            passwordRef.current.type = "text"
        }

    }
    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            setpasswordsArray([...passwordsArray, {...form, id:uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id:uuidv4()}]))
            console.log([...passwordsArray, form])
            setform({ site: "", username: "", password: "" })
            toast('pass saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else{
            toast('pass not saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    const deletePassword = (id) => {
        let c = confirm("Do you really want to delte this password?")
        if(c){
            setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item=>item.id!==id)))
        }
    }

    const editPassword = (id) => {
        setform(passwordsArray.filter(i=>i.id === id)[0])
        setpasswordsArray(passwordsArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
        
        <ToastContainer />    
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>


            <div className="p-2 md:mycontainer mx-auto min-h-[82.2vh]">
                <h1 className='text-3xl font-bold text-center py-2'>
                    <span className='text-green-700'>/&lt;</span>
                    PassMan
                    <span className='text-green-700'>/&gt;</span>
                </h1>


                <p className='text-green-900 text-lg text-center py-2'>Your own password manager</p>


                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='text' name='site' id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">

                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='text' name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className='rounded-full border border-emerald-500 w-full p-4 py-1' type='password' name='password' id='password' />
                            <span className='absolute right-2 py-1 invert cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={26} src="icons/Visibility-icon.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex text-emerald-500 justify-center items-center gap-2 bg-slate-600 hover:bg-green-200 rounded-full px-4 py-2 w-fit border border-slate-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover">
                        </lord-icon>Save Password</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>
                        your passwords
                    </h2>

                    {passwordsArray.length === 0 && <div>No passwords to show</div>}
                    {passwordsArray.length != 0 &&

                        <table className="table-auto w-full rounded-md  overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white py-2' >
                                <tr className=' justify-around'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordsArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="text-center py-2 w-32">
                                            <div className='flex justify-between items-center px-16'>
                                                <a href={item.site} target="_blank">{item.site}</a>
                                                <img onClick={() => { copyText(item.site) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32 border-x">
                                            <div className='flex justify-between items-center px-16'>{item.username}
                                                <img onClick={() => { copyText(item.username) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32 border-x">
                                            <div className='flex justify-between items-center px-16'>
                                                {item.password}
                                                <img onClick={() => { copyText(item.password) }} width={20} className='invert cursor-pointer' src="/icons/copy.png" alt="cpy"/>
                                            </div>
                                        </td>
                                        <td className="text-center py-2 w-32">
                                            <div className='flex px-20 gap-5'>
                                                <span className='cursor-pointer'>
                                                  <img onClick={()=>{deletePassword(item.id)}} className='invert w-8' src="/icons/delete.png" alt=""/>
                                                </span>
                                                <span className='cursor-pointer'>
                                                  <img onClick={()=>{editPassword(item.id)}}  className='invert w-8' src="/icons/edit.png" alt=""/>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>

        </>

    )
}

export default Manager
