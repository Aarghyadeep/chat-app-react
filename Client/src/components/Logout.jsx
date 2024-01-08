import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {

    const navigate = useNavigate();
    const handleClick = async () => {
      const id = await JSON.parse(
        localStorage.getItem("chat-app-user")
      )._id;
      const data = await axios.get(`${logoutRoute}/${id}`);
      if (data.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    };

  return (
    <>
     <button onClick={handleClick}
     className="flex items-center justify-center p-2 
     rounded-lg text-white text-[1.3rem] hover:bg-fuchsia-600 bg-[#9a86f3]
     ">
     <BiPowerOff />
     </button>
    </>
  )
}
