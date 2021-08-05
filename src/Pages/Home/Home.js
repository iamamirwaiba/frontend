import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Home.css";
import NavBar from "../../components/NavBar";

function Home() {
  const [getData, setData] = useState([])
  useEffect(() =>{
    const fetchData = async() => {
     const data = await axios.get('http://localhost:8080/api/v1/public/findAll')
      setData(data.data)


    }
    fetchData();
  }, [])
console.log(getData)

  return (
  <>
    <NavBar />
    <div className="container">
      <div className="row">


          <h1>Book My Arena</h1>
          <p>A systematic way to book futsal</p>


        {getData.map((data) =>

            <div id="container">
              <div className="product-details">
                <div className='display-flex'>
                  <div className=''>

                <h1
                    style={{
                      fontFamily: "Arvo",
                      fontSize: "25px",
                      textAlign: "left",
                      color: "black",
                    }}
                >
                  {data.name}
                </h1>
                <p
                    style={{
                      fontFamily: "Arvo",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "15px",
                    }}
                >
                  {data.address}
                </p>
                <p
                    style={{
                      fontFamily: "Arvo",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "15px",
                    }}
                >
                  {data.phoneNumber}
                </p>
                <p
                    style={{
                      fontFamily: "Arvo",
                      fontSize: "14px",
                      textAlign: "left",
                      marginBottom: "15px",
                    }}
                >
        {data.description}
                </p>
                <div >
          <img
            src="https://www.myholidaynepal.com/blog/images/blogimage/Kathmandu-Futsal-20130717231003.jpg"
            alt="Omar Dsoky"
          />
                 
        </div>                  </div>
                  <div>

                  </div>

              </div>
              </div>
            </div>
        )}
      </div>
    </div>
    </>  );
}

export default Home;
