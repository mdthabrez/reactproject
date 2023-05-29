import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service"; 

const Home = () => {

  
  const [val,setVal] = useState("");

  const [content, setContent] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const us=JSON.parse(localStorage.getItem("user"));
  console.log(us.username);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response.data);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          
        setContent(_content);
      }
    );
  }, []);

  return (
    <div>
      <div>
      <Navbar />
      </div> 
  
   
      Home
      
    </div>
  )
}

export default Home;
