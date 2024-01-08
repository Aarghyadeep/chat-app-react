import { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const setName = async ()=> {
            setUserName(
                await JSON.parse(
                  localStorage.getItem("chat-app-user")
                ).username
              );
        }
       setName();
      }, []);

  return (
    <div className="flex flex-col items-center justify-center">
     <img 
     className="h-[20rem]"
     src={Robot} alt="Robot" />
     <p className="text-white font-bold text-3xl">Welcome, <span className="text-[#4e0eff]">{userName}!</span></p>
     <p className="text-white font-bold text-xl">Please select a chat to Start messaging.</p>
    </div>
  )
}
