import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import './OfficeWebPortal.css'; // import custom CSS
// import Captcha from "react-numeric-captcha";
// import "./captcha.css";


const LoginForm = () => {
  const [captchaSuccess, setCaptchaSuccess] = useState(false);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={3} className="py-4 primary-color"></Col>
        <Col xs={9} className="d-flex align-items-center justify-content-center">
          <div>
          <h1 className="pb-3 mb-4 border-bottom pl-2 pr-2" style={{borderBottomWidth: '10px'}}>
            <span style={{marginLeft: '45px'}}>Office</span> <span >Web Portal</span>
          </h1>

            <Form style={{ minWidth: '500px' }}>
              
              <FormGroup>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl type="text" id="username" placeholder="Enter your username" />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl type="password" id="password" placeholder="Enter your password" />
              </FormGroup>
              <FormGroup style={{ textAlign: 'center' }}>
                <Row>
                  <Col xs={6}>
                    <FormGroup>
                      {/* <Captcha
                        onChange={(status) => setCaptchaSuccess(status)}
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Button disabled={!captchaSuccess} variant="primary" type="submit" className="btn-login">
                  Login
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
