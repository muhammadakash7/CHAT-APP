import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute,host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]); //Holds the list of contacts.
  const [currentUser, setCurrentUser] = useState(undefined); // Represents the currently logged-in user.
  const [currentChat, setCurrentChat] = useState(undefined); //Represents the currently selected chat.
  // const [isLoaded, setIsLoaded]=useState(false)

  //hook runs when the component mounts 
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        // setIsLoaded(true);
      }
    };
    fetchData();
  }, []);

  //hook establishes a WebSocket connection when the currentUser state updates.
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  //hook fetches contacts data when the currentUser state updates.
  useEffect( () => {
    const fetchData = async ()=>{
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  } 
  fetchData()
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
          />
          { currentChat === undefined ? (
            <Welcome />
          // {isLoaded && currentChat === undefined ? (
          //   <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}

          {/* <Welcome currentUser={currentUser} /> */}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    // background-color:lightblue;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
