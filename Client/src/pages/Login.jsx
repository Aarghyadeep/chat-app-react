import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";


export default function Login() {

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
      if(localStorage.getItem("chat-app-user")){
        navigate('/');
      };  
  },[]);

  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation()){
      const { username,password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event)=>{
     setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = ()=> {
     const { username,password } = values;
     if(password === ""){
      toast.error(
        "Email and password is required.",
        toastOptions
      );
     return false;
     } else if (username.length === "") {
      toast.error(
        "Email and password is required.",
        toastOptions
      );
      return false;
    } 
    return true;
  };

  return (
    < >
     <div className="h-screen bg-[#131324] text-white flex items-center justify-center">
     
      <form className="bg-gray-950 w-[30rem] p-6 h-[28rem] shadow-xl rounded-xl" onSubmit={(event)=>handleSubmit(event)}>
      <div className="flex items-center justify-center mb-6">
            <img className="size-12" src={Logo} alt="Logo" />
            <p className="text-3xl font-bold font-mono m-2">CHIT-CHAT</p>
            </div>
         <div className="flex flex-col items-center justify-center font-serif">
            <div className="">
            <input 
                className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md
                text-base focus:outline-none border border-blue-600 focus:border-blue-300 px-2 py-1"
                type="text" 
                placeholder="Username" 
                name="username"
                min="3" 
                onChange={(e)=>handleChange(e)}/>
                <br />
            <input 
                className="mt-3 mb-2 w-80 place-items-center bg-transparent rounded-md
                text-base focus:outline-none border border-blue-600 focus:border-blue-300 px-2 py-1"
                type="password" 
                placeholder="Password" 
                name="password" 
                onChange={(e)=>handleChange(e)}/>
                <br />
                <button className="mt-3 mb-4 bg-blue-500 px-3 font-semibold hover:bg-blue-600
                font-sans w-80 h-8 ring-2 ring-blue-300
                hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" type="submit">LOG IN</button><br />
                <div className="flex items-center justify-center">
                <span className="text-sm ">DON'T HAVE AN ACCOUNT ? &nbsp;
                <Link className="text-blue-500 text-sm hover:underline" to="/register">REGISTER</Link></span> 
                </div>
            </div>                  
         </div>
      </form>
      <ToastContainer />
    </div>
    </>
  )
};
