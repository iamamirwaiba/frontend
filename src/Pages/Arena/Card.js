import React, {useEffect, useState} from "react";
import axios from "axios"

export const Card = (props) => {
    useEffect( () => {
      const getData = async () => {
            await axios.get("http://localhost:8080/api/v1/public/findAll")
            .then((response) => {
                console.log(response);
            });
          }
          getData()
    },[] );
  return (
    <>
      <div id="container">
        <div class="product-details">
          <h1
            style={{
              fontFamily: "Arvo",
              fontSize: "25px",
              textAlign: "left",
              color: "black",
            }}
          >
            {props.name}
          </h1>
          <p
            style={{
              fontFamily: "Arvo",
              fontSize: "14px",
              textAlign: "left",
              marginBottom: "15px",
            }}
          >
            {props.address}
          </p>

          <p
            style={{ fontFamily: "Arvo", fontSize: "14px", textAlign: "left" }}
            class="information"
          >
            {props.description}
          </p>
        </div>
        <div class="arena-image">
          <img
            src="https://www.myholidaynepal.com/blog/images/blogimage/Kathmandu-Futsal-20130717231003.jpg"
            alt="Omar Dsoky"
          />
        </div>
      </div>
    </>
  );
};

export default Card;
