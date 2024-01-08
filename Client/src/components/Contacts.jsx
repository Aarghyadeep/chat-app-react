import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";


export default function Contacts({ contacts, changeChat }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const details = async ()=>{
        const data = await JSON.parse(
            localStorage.getItem("chat-app-user")
          );
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
    }
    details();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };


  return (
    <>
      {
        currentUserImage && currentUserImage && (
            <div className="grid grid-rows-[10%_75%_15%] bg-[#080420] overflow-hidden">
                <div className="flex items-center justify-center gap-1">
                <img className="size-8" src={Logo} alt="Logo" />
                <p className="text-2xl font-bold font-mono m-2 text-white font-bold">CHIT-CHAT</p>
                </div>
                <div className="flex flex-col gap-3 items-center overflow-auto mt-3">
                    {
                    contacts.map((contact, index) => {
                         return( 
                          <div key={contact._id} 
                          className={`${
                             index === currentSelected ? "bg-[#9a86f3]" : ""
                           }`}
                           onClick={() => changeCurrentChat(index, contact)}>
                            <div className="flex bg-[#ffffff34] w-64 min-h-[5rem] cursor-pointer
                             rounded p-2 items-center gap-4 transition-all
                             ">
                            <div>
                                <img 
                                className="h-[3rem]"
                                src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                alt="avatar" />
                            </div>
                            <div>
                                <p className="text-white text-xl font-serif">{contact.username}</p>
                            </div>
                         </div>
                          </div>
                         )
                    })
                    }
                </div>
                <div className="flex bg-[#0d0d30] justify-center items-center gap-8">
                         <div>
                            <img 
                            className="h-[3.7rem]"
                            src={`data:image/svg+xml;base64,${currentUserImage}`} 
                             alt="avatar" />
                                </div>
                                <div>
                                    <p  className="text-white text-2xl font-serif">{currentUserName}</p>
                                </div>
                </div>
            </div>
        )
      }
    </>
  )
}
