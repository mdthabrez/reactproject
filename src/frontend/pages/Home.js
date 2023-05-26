import React from 'react'
import Navbar from '../components/Navbar';
import AuthService from "../services/auth.service";


const Home = () => {

  const currentUser = AuthService.getCurrentUser();

  console.log(currentUser)
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
