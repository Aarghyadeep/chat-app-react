import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";


export default function ChatInput({ handleSendMsg }) {

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
      };

    const handleEmojiClick = (event) => {
        console.log(event);
        let message = msg;
        message += event.emoji;
        setMsg(message);
      };
      
      const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
          handleSendMsg(msg);
          setMsg("");
        }
      };

  return (
    <div className="grid items-center grid-cols-[5%_95%] bg-[#080420] p-[0rem_2rem]">
      <div className="flex items-center text-white gap-4">
        <div className="relative text-[1.5rem] text-[#ffff00c8] cursor-pointer">
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            {showEmojiPicker && <div className="absolute top-[-350px]">
              <Picker theme="dark" width="300" height="50vh" onEmojiClick={handleEmojiClick} /></div>}
        </div>
      </div>
      <form className="w-[100%] rounded-[2rem] gap-8 flex items-center bg-[#ffffff34]"
      onSubmit={(event) => sendChat(event)}>
        <input 
        className="w-[90%] h-[60%] bg-transparent text-white pl-4 text-[1.2rem] border-none
        focus:outline-none"
        type="text" placeholder="type your messsage here"
        onChange={(e) => setMsg(e.target.value)}
          value={msg} />
        <button 
        className="p-[0.3rem_2rem] flex justify-center items-center border-none 
        bg-[#9a86f3] text-white text-[2rem]"
        type="submit">
            <IoMdSend />
        </button>
      </form>
    </div>
  )
}

