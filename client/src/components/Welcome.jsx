
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Robot from "../assets/robot.gif";
import Robot from "../assets/robot1.gif";
export default function Welcome() {
  const [userName, setUserName] = useState(""); // hold the username of the logged-in user.
  useEffect(() => {
    const fetchData =async ()=>{
    setUserName(
      await JSON.parse(
        localStorage.getItem('chat-app-user')
      ).username
    );
      }
      fetchData()
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a Friend to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    // height: 20rem;
    height: 10rem;
    margin-bottom:12px
  }
  span {
    // color: #4e0eff;
    color: #f1c40f;
  }
`;