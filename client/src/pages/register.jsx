import React, { useState,useEffect } from 'react' 
import styled from "styled-components";
import {  Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import Logo from "../assets/logo2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from "../utils/ApiRoutes";  
function Register() {
  const [values,setValues]= useState({
    username:"",  
    email:"",
    password:"",
    confirmPassword:""
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
        console.log("In Validation here",registerRoute );
          const { password, username, email } = values;
          const {data}= await axios.post(registerRoute,{ 
            username, 
            email,
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
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        toast.error(
          "Password and confirm password should be same.",
          toastOptions
        );
        return false;
      } else if (username.length < 3) {
        toast.error(
          "Username should be greater than 3 characters.",
          toastOptions
        );
        return false;
      } else if (password.length < 6) {
        toast.error(
          "Password should be equal or greater than 6 characters.",
          toastOptions
        );
        return false;
      } else if (email === "") {
        toast.error("Email is required.", toastOptions);
        return false;
      }
  
      // return (
      //   alert("Done")    
      // )
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
              />
              <input
                type="email"
                placeholder="Email" 
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)} 
              />
              <button type="submit">Create User</button>
              <span>
                Already have an account ? <Link to="/login">Login.</Link>
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
          background-color: #4e0eff;
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

export default Register
