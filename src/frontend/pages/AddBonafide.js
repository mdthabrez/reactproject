import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/Navbar';

import BonafideService from "../services/bonafide.service";
import api from "../services/api"
const departments = [
  'CS',
  'IT',
  'ECE',
  'EEE',
  'MECH',
];

const years = [
  'I',
  'II',
  'III',
  'IV',
];

const branches = [
  'B.E',
  'B.Tech',
  'M.Tech',
  'M.E',
];


function BonafideGenerator() {
  const formRef = useRef();
  const [formData, setFormData] = useState(true);
  const [error, setError] = useState('');

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

  
  const [dept, setDept] = useState('');


   
  const handleSubmit = async (event) => {
    const form = formRef.current;
    const regex = /^[0-9]+$/;
    const regisNo = formData.studentRegis;
   
    setError('');
    if (!regex.test(regisNo)) {
      setError('Invalid registration number');
      return;
    }

    console.log("addbonafide",JSON.stringify(formData));
    
    event.preventDefault();
    try {
      const response = await api.post('/addbonafide', formData, {
        responseType: 'blob', // Set the response type to 'blob'
      });
      const url = URL.createObjectURL(new Blob([response.data])); // Create object URL from the response blob
      const link = document.createElement('a');
      link.href = url;
      link.download = 'output.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Failed to generate PDF');
      console.error(error);
    }
    setError(''); // Clear any previous errors
    // window.location.reload();
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
      <Navbar/>
  

    
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6 mb-3">
      
      <Form novalidate onSubmit={handleSubmit} ref={formRef} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
      <h2 className='mb-3'>Bonafide Certificate Request Form</h2>
      {/* Display error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" placeholder="Enter student's name" name="studentName" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control type="text" placeholder="Enter student's registration number" name="studentRegis" required onChange={handleChange}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicBranch">
            <Form.Label>Branch</Form.Label>
            <Form.Control as="select" name='studentBranch' onChange={handleChange} required>
              <option value="">Select branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicDept">
            <Form.Label>Department</Form.Label>
            <Form.Control as="select" name='studentDept' onChange={handleChange} required>
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicYear">
            <Form.Label>Current Year</Form.Label>
            <Form.Control as="select" name='studentYear' onChange={handleChange} required>
              <option value="">Select your year</option>
              {years.map((curr_year) => (
                <option key={curr_year} value={curr_year}>{curr_year}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicDate">
            <Form.Label>Date of Issue</Form.Label>
            <Form.Control type="date" placeholder="Enter date" name="dateOfIssue" required onChange={handleChange}/>
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