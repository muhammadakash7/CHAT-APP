import React, {useState,useEffect,useRef} from "react";
import axios from 'axios'
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { sendMessageRoute,getAllMessagesRoute } from "../utils/ApiRoutes";
import { v4 as uuidv4 } from "uuid"; //Function for generating unique IDs
export default function ChatContainer({ currentChat,currentUser,socket }) {
  const [messages, setMessages] = useState([]); //for storing chat messages
  const [arrivalMessage, setArrivalMessage] = useState(null); //for storing new messages received from the server
  const scrollRef = useRef();

   //useEffect hook to Fetch messages when currentChat or currentUser changes
  useEffect( () => {
    if(currentChat){
    const fetchdata = async ()=>{
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
    });  
    setMessages(response.data);
  }
  fetchdata();
}
  }, [currentChat,currentUser]);

  // Function to handle sending messages
  const handleSendMsg =async (msg)=>{
     // Send message to the server
    await axios.post(sendMessageRoute,{
      from: currentUser._id,
      to: currentChat._id, 
      message:msg 
    });
    // Emit message event through socket
    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    });
      // Update local messages state with the sent message
    const msgs = [...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
  };

  //useEffect hook to Listen for new messages from the server
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  // Update messages state when a new message arrives
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
    {currentChat &&(
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
    )}
    </>
  );
}

const Container = styled.div` 
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 2rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        // background-color: #4f04ff21;
        background-color: #3498db;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        // background-color: #9900ff20;
        background-color: #e5185d;
      }
    }
  }
`;
