import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Register.css";

function SignUp() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    DOB: "",
  });

  const [valid, setValid] = useState(true);
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    setValid(true);
    e.preventDefault();
    if (values.password !== values.cPassword) {
      setValid(false);
    }
    const data = values;
    delete data.confirmPassword;
    axios
      .post("http://localhost:8080/api/v1/public/signUp", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        DOB: data.DOB,
      })
      .then((response) => {
        // localStorage.setItem("user", response.data.results.token);
        console.log(response);
        // localStorage.setItem("user-info", data);
        history.push("/login");
      })
      .catch((e) => {
        console.log(e);
        setValid(false);
      });
  };

  return (
    <Container>
      <div className="textCenter">
        <form className="form_signIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lock"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h2>Sign Up</h2>

          <input
            id="firstName"
            name="firstName"
            className="form-field"
            onChange={handleChange}
            value={values.firstName}
            placeholder="FirstName"
            type="text"
          />

          <input
            id="lastName"
            name="lastName"
            className="form-field"
            onChange={handleChange}
            value={values.lastName}
            placeholder="Last Name"
            type="text"
          />

          <input
            id="email"
            name="email"
            className="form-field"
            onChange={handleChange}
            value={values.email}
            placeholder="Email Address"
            type="text"
          />

          <input
            id="DOB"
            name="DOB"
            className="form-field"
            onChange={handleChange}
            value={values.DOB}
            placeholder="YYYY-MM-DD"
            type="text"
          />
          <input
            id="phoneNumber"
            name="phoneNumber"
            className="form-field"
            onChange={handleChange}
            value={values.phoneNumber}
            placeholder="Phone Number"
            type="text"
          />
          <input
            id="password"
            name="password"
            className="form-field"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            type="password"
          />
          {/* <input
            id="cPassword"
            name="cPassword"
            className="form-field"
            onChange={handleChange}
            value={values.cPassword}
            placeholder="Confirm Password"
            type="password"
          /> */}

          <Button
            variant="flat"
            size="xm"
            type="submit"
            className="submit-btn"
            onClick={handleSubmitClick}
          >
            Register
          </Button>
        </form>

        {/* {!valid ? <span>Password not matching </span> : <></>} */}
      </div>
    </Container>
  );
}

export default SignUp;
