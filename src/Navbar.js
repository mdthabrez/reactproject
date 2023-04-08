import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar p-0 mb-3">
    <div class="container-fluid py-2 primary-color">
      <Link class="navbar-brand white-color " to="/">mydist</Link>
      
      <span class="navbar-text white-color me-3 " >
        Welcome Ms. Hamsa Rakha
        <br></br> 
      <span>Superintendent</span>
      </span>
      
    
    </div>
    <div class="container-fluid navbar-expand-lg background-grey">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#SecondaryNavbar" aria-controls="SecondaryNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="SecondaryNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 secondary-navbar">
          <li class="nav-item">
         
         <Link class="nav-link" to="/">My dashboard</Link>
          </li>
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/"  >NAAC </Link>
          </li>
   <li class="nav-item">
            <Link class="nav-link" >NBA</Link>
          </li>
   <li class="nav-item">
            <Link class="nav-link ">Annual Report</Link>
          </li>
   <li class="nav-item">
            <Link class="nav-link ">Resources</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/bonafide-generator">Bonafide Certificate</Link>
          </li>
          <li class="nav-item">
          <Link class="nav-link" to="/circular-upload">Circular Upload</Link>
          </li>
        </ul>
        
        <span class="material-symbols-outlined navbar-text px-1">
  manage_accounts
  </span>
        <span class="material-symbols-outlined navbar-text px-1">
  logout
  </span>
      </div>
      
    </div>
  
  </nav>

  )
}
