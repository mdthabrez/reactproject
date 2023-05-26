import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const LoginPage = () => {
  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [captchaSuccess, setCaptchaSuccess] = useState(false);

  const handleForgotPasswordClick = () => {
   
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);


    // if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/Home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
              console.error(error)
          setLoading(false);
          setMessage(resMessage);
        }
      );
    // } else {
    //   setLoading(false);
    // }
  };

  return (
    <div>
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={3} className="py-4 primary-color"></Col>
        <Col xs={9} className="d-flex align-items-center justify-content-center">
          <div>
          <h1 className="pb-3 mb-4 border-bottom pl-2 pr-2" style={{borderBottomWidth: '10px'}}>
            <span style={{marginLeft: '45px'}}>Office</span> <span >Web Portal</span>
          </h1>

            <Form 
            onSubmit={handleLogin} ref={form}
            style={{ minWidth: '500px' }}>
              
              <FormGroup>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl 
                type="text" 
                id="username" 
                placeholder="Enter your username"
                name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]} />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                value={password}
              onChange={onChangePassword}
              validations={[required]}/>
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
                <Button  disabled={!captchaSuccess && loading} variant="primary" type="submit" className="btn-login">
                  Log In
                </Button>
                {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
            
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default LoginPage;
