import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import {  Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import Logo from "../assets/logo2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { loginRoute } from "../utils/ApiRoutes"; 

 
function Login() {
  const [values,setValues]= useState({
    username:"",
    password:""
  });

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/");
    }
  }, []);


    const handleSubmit = async (event)=>{ 
      event.preventDefault();
      console.log("dtr");
      if(handleValidation()){
        console.log("In Validation here",loginRoute );
          const { password, username } = values;
          const {data}= await axios.post(loginRoute,{ 
            username, 
            password, 
          });
          if(data.status===false){
            toast.error(data.msg, toastOptions);
          }
          if(data.status===true){
            localStorage.setItem("chat-app-user",JSON.stringify(data.user));
            navigate("/");
          }
        }
    }

    const handleChange = (event)=>{
      setValues({...values,[event.target.name]: event.target.value})
    };

    const handleValidation = () => {
      const { password, username} = values;
      if (password === "") {
        toast.error(
          "Username and Password is required.",
          toastOptions
        );
        return false;
      } else if (username.length=== "") {
        toast.error(
          "Username and Password is required.",
          toastOptions
        );
        return false;
      } 
      return true;
    };
    return (
        <>
          <FormContainer>
            <form action="" onSubmit={(event) => handleSubmit(event)}>
              <div className="brand">
                <img src={Logo} alt="logo" /> 
                <h1>chat app</h1>
              </div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(e) => handleChange(e)}
                min="3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Login In</button>
              <span>
                Don't have an account ? <Link to="/register">Register.</Link>
              </span>
            </form>
          </FormContainer> 
          <ToastContainer /> 
        </>
      );
    }
    
    const FormContainer = styled.div`
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      background-color: #131324;
      .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
          // height: 5rem;
          height: 4rem;
        }
        h1 {
          // color: white;
          color: yellow;
          text-transform: uppercase;
        }
      }
    
      form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        // background-color: yellow;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 1rem 3rem;
        // padding: 3rem 5rem;
      }
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          // border: 0.1rem solid #997af0;
          border: 0.1rem solid yellow;
          outline: none;
        }
      }
      button {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
          // background-color: #4e0eff;
        }
      }
      span {
        color: white;
        text-transform: uppercase;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
    `;
// }

export default Login
