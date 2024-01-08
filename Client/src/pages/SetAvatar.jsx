import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";


export default function SetAvatar() {

  const api = 'https://api.multiavatar.com/4645646';
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const Redirect = async () => {
      if (!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }
    }
    Redirect();
  }, []);

  const setProfilePicture = async ()=> {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    }else {
      const user = await JSON.parse(
        localStorage.getItem("chat-app-user")
      );
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(user)
        );
        navigate("/");
      }else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
  };
}

  useEffect(() => {
    const getAvatar = async()=>{
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}/?apikey=IHmDq26rVgPNpo`
          );
          console.log(image);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
    setIsLoading(false);
      }
     catch {
       console.error(error.message);
     }

    }
    getAvatar();
  }, []);

  return (
    <>
    {
      isLoading ? <div className="h-screen bg-[#131324] flex items-center justify-center">
        <img src={Loader} alt="loader" />
      </div> : (
                 <div className="h-screen bg-[#131324] text-white flex items-center justify-center">
                 <div>
                 <p className="text-3xl text-center mb-10 font-bold font-mono">
                     Pick an avatar as your profile picture
                 </p>
                 <div className="flex items-center justify-center">
                        {avatars.map((avatar, index) => {
                         return (
                           <div
                           key={index}
                             className={`avatar ${
                               selectedAvatar === index ? "shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] rounded-full" : ""
                             }`}
                           >
                             <img
                               src={`data:image/svg+xml;base64,${avatar}`}
                               alt="avatar"
                               onClick={() => setSelectedAvatar(index)}
                               className="w-[6rem] h-[6rem] m-3 border-solid border-transparent transition-all duration-0"
                             />
                              </div>
                              );
                          })
                     }
                 </div>
                 <div className="flex items-center justify-center mt-6">
                 <button className="mt-3 mb-4 bg-blue-500 px-3 font-semibold hover:bg-blue-600
                         font-sans w-80 h-8 ring-2 ring-blue-300
                         hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]" 
                 onClick={setProfilePicture}>Set as profile picture</button>
                 </div>
                 </div> 
               <ToastContainer />
             </div>
      )
    }
    
    </>
  )
}
