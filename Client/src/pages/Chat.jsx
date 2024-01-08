import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Contacts from './../components/Contacts';
import { io } from "socket.io-client";
import axios from "axios";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

export default function Chat() {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const redirect = async ()=> {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem("chat-app-user")
          )
        );
      }
    }
    redirect();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);


  useEffect(() => {
    const contactRedirect = async()=> {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    contactRedirect();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <div className="h-screen flex flex-col items-center justify-center 
    gap-[1rem] bg-[#131324]">
      <div className="h-[85vh] w-[85vw] bg-gray-950  grid grid-cols-[25%_75%]">
         <Contacts contacts={contacts} changeChat={handleChatChange} />
         {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket}/>
          )}
      </div>
    </div>
  )
}
