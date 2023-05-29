import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service"; 
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

const Home = () => {

  const [name,setName] = useState("");
  const [designation,setDesig] = useState("");
  const [val,setVal] = useState("");

  const [content, setContent] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const us=JSON.parse(localStorage.getItem("user"));
  console.log(us.username);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log(response.data);
        const { username, designation } = response.data;
        setName(username);
        setDesig(designation.d_name);
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
  
   
      
      <MDBRow>
          <MDBCol lg="4">
      <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{name}</p>
                <p className="text-muted mb-4">{designation}</p>
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          </MDBRow>
    </div>
  )
}

export default Home;
