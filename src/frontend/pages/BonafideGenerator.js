import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Navbar from '../components/Navbar';


function BonafideGenerator() {
  const formRef = useRef();
  const [formData, setFormData] = useState(true);

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to match valid phone numbers
    const phoneNumberRegex = /^[+]?[0-9]{1,3}[-\s.]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
  
    // Remove any non-numeric characters from the phone number
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the numeric phone number matches the regex
    if (phoneNumberRegex.test(numericPhoneNumber)) {
      return true; // Valid phone number
    } else {
      return false; // Invalid phone number
    }
  };
  

  const handleSubmit = async (event) => {
    const form = formRef.current;
    const regex = /^[0-9]+$/;
    const regisNo = formData.registration;
    const phone = formData.mobile;
    if (!regex.test(regisNo)) {
      return;
    }
    if(!validatePhoneNumber(phone)){
      return;
    }
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    }
    form.reset();
  };
  

  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };
  return (
    <div>
  
<Navbar />
    
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      
      <Form novalidate onSubmit={handleSubmit} ref={formRef} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
      <h2 className='mb-3'>Bonafide Certificate Request Form</h2>
      <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" placeholder="Enter student's name" name="name" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control type="text" placeholder="Enter student's registration number" name="registration" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicBrach">
            <Form.Label>Branch</Form.Label>
            <Form.Control type="text" placeholder="Enter branch" name="branch" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicDept">
            <Form.Label>Department</Form.Label>
            <Form.Control type="text" placeholder="Enter department name" name="dept" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicPhone">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control type="text" placeholder="Enter mobile number" name="mobile" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicDate">
            <Form.Label>Date of Issue</Form.Label>
            <Form.Control type="date" placeholder="Enter date" name="date" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-5' controlId="formBasicText">
            <Form.Label>Purpose</Form.Label>
            <Form.Control type="text" placeholder="Enter purpose for the bonafide" name="purpose" required onChange={handleChange}/>
          </Form.Group>
          
        <div className="d-grid gap-2">
          <Button onClick={handleSubmit} styles={{backgroundColor:"red"}}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  </div>
</div>
    
    
    </div>
  );
}

export default BonafideGenerator;