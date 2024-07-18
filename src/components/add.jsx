import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { FaCopy } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";

const Add = () => {
  const passref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    try {
      let fetched = await fetch('http://localhost:3000/api/get');
      let data = await fetched.json();
      setPasswordArray(data);
    } catch (error) {
      console.error("Failed to fetch passwords", error);
    }
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const showPass = () => {
    if (passref.current.type === "password") {
      passref.current.type = "text";
    } else {
      passref.current.type = "password";
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePass = async () => {
    if (form.username && form.password && form.site) {
      if (form.site.includes(".")) {
        deleteDetails(form.id)
        const newPassword = { ...form, id: uuidv4() };
        const updatedPasswords = [...passwordArray, newPassword];
        setPasswordArray(updatedPasswords);
        console.log(newPassword)

        try {
          let res = await fetch("http://localhost:3000/api/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newPassword)
          });

          if (res.ok) {
            localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
            setForm({ site: "", username: "", password: "" });
          } else {
            toast.error("Failed to save password");
          }
        } catch (error) {
          console.error("Failed to save password", error);
        }
      } else {
        toast.error("Invalid site address");
      }
    } else {
      toast.error('Fields cannot be empty');
    }
  };

  const deleteDetails = async (id) => {
    const updatedPasswords = passwordArray.filter(i => i.id !== id);
    setPasswordArray(updatedPasswords);

    try {
      let res = await fetch("http://localhost:3000/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      } else {
        toast.error("Failed to delete password");
      }
    } catch (error) {
      console.error("Failed to delete password", error);
    }
  };

  const editDetails = (id) => {
    const itemToEdit = passwordArray.find(i => i.id === id);
    setForm(itemToEdit);
    
    setPasswordArray(passwordArray.filter(i => i.id !== id))
    
  };

  const copyText = (text) => {
    toast('Copied to Clipboard', {
      icon: '📋',
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className='w-full mx-auto flex flex-col my-10 text-lg lg:text-xl'>
      <div><Toaster /></div>
      <div className='w-fit lg:w-[40%] flex mx-auto'>
        <input value={form.site} name='site' onChange={handleChange} placeholder='Enter the address' className='m-2 rounded-lg w-[90%] mx-auto p-4' />
      </div>
      <div className='w-fit lg:w-[40%] flex flex-col lg:flex-row items-center mx-auto'>
        <input placeholder='Enter username' name="username" value={form.username} onChange={handleChange} className='rounded-lg w-fit lg:w-[48%] m-2 p-4' />
        <div className='flex'>
          <input ref={passref} placeholder='Enter password' name="password" type='password' onChange={handleChange} value={form.password} className='rounded-lg w-[100%] m-2 p-4' />
          <div className='relative right-14 top-6 z-10 text-black font-thin cursor-pointer w-0' onClick={showPass}>
            <lord-icon src="https://cdn.lordicon.com/vfczflna.json" trigger="click" colors="primary:#000000,secondary:#000000" style={{ width: "40px", height: "30px" }}>
            </lord-icon>
          </div>
        </div>
      </div>
      <button className='w-fit lg:w-[30%] my-4 mx-auto p-4 font-extrabold rounded-lg bg-blue-400 text-black' onClick={savePass}>Add Password</button>
      <div className='flex flex-col text-xs lg:text-xl lg:m-10 lg:mx-auto w-fit lg:w-[80%] justify-between overflow-hidden'>
        <div className='w-fit lg:w-[35%] mx-auto font-extrabold text-blue-300 p-4 text-2xl'>Saved passwords</div>
        {passwordArray.length !== 0 && <div className='w-[100%] flex text-sm justify-around text-pretty border-2 bg-blue-900 text-white border-black font-bold'>
          <div className='p-2 w-[33%] mx-auto text-center'>Address</div>
          <div className='p-2 w-[33%] mx-auto text-center'>Username</div>
          <div className='p-2 w-[33%] mx-auto text-center'>Password</div>
          <div className='p-2 w-[33%] mx-auto text-center'>Actions</div>
        </div>}
        {Array.isArray(passwordArray) && passwordArray.map((e, key) => (
          <div className='flex justify-around text-pretty bg-blue-200 w-[100%]' key={e.id}>
            <div className='overflow-auto w-[33%] mx-auto rounded-lg flex justify-center text-wrap lg:p-4'>{e.site}
              <div onClick={() => copyText(e.site)} className='cursor-pointer p-1 mx-1'><FaCopy /></div>
            </div>
            <div className='overflow-auto w-[33%] mx-auto rounded-lg flex justify-center text-wrap lg:p-4'>{e.username}
              <div onClick={() => copyText(e.username)} className='cursor-pointer p-1 mx-1'><FaCopy /></div>
            </div>
            <div className='overflow-auto w-[33%] mx-auto rounded-lg flex justify-center text-wrap lg:p-4'>{e.password}
              <div onClick={() => copyText(e.password)} className='cursor-pointer p-1 mx-1'><FaCopy /></div>
            </div>
            <div className='overflow-auto w-[33%] mx-auto rounded-lg flex justify-center text-wrap lg:p-4 '>
              <div onClick={() => editDetails(e.id)}><MdEdit /></div>
              <div onClick={() => deleteDetails(e.id)}><MdDelete /></div>
            </div>
          </div>
        ))}
        {passwordArray.length === 0 && <div className='text-xl text-white mx-auto font-bold text-red-600 p-4 rounded-lg'>No passwords to show</div>}
      </div>
    </div>
  );
};

export default Add;
