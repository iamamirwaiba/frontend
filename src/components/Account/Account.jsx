import axios from 'axios'
import React, {useEffect, useState} from 'react'
import NavBar from '../NavBar'
import {Button} from 'react-bootstrap';
import { Modal,  } from "react-bootstrap";


function Account() {
  const [myBooking, setMyBooking] = useState([{}])
  const [cancelBooking, setCancelBooking] = useState([{}])
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const getUser = localStorage.getItem('user_id')
      const stringifyUser = getUser.toString()
      const myBookings = await axios.post('http://localhost:8080/api/v1/public/findbookbyuser', {"user_id": stringifyUser})
      setMyBooking(myBookings.data)
     }
    fetchData()
  }, [])
  console.log(myBooking)

  const handleClose = () => {
    setShow(false)
  }

  const onCancelBooking =async (id) => {
    // window.location.reload()
    console.log(id)
    const stringedId = id.toString()
    console.log(stringedId)
    const myBookings = await axios.post('http://localhost:8080/api/v1/public/cancleBook', {"bookId": stringedId})  
    console.log(myBookings)
    setCancelBooking(myBookings)
    
    if(myBookings.status === 200) {
      const getUser = localStorage.getItem('user_id')
      const stringifyUser = getUser.toString()

      setShow(true)
      const myBookings = await axios.post('http://localhost:8080/api/v1/public/findbookbyuser', {"user_id": stringifyUser})
      setMyBooking(myBookings.data)


    }
    }

    return (
      <>
      <NavBar />
      {myBooking.length>0 ? "": <h2>No Bookings available</h2>}

                 {myBooking.map((data) =>

     <div>
       
      
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
{data.name}       </h1>
          <p
            style={{
              fontFamily: "Arvo",
              fontSize: "14px",
              textAlign: "left",
              marginBottom: "15px",
            }}
          >
Time: {data.bookedTime}          </p>

          <p
            style={{ fontFamily: "Arvo", fontSize: "14px", textAlign: "left" }}
            class="information"
          >
Date: {data.bookedDate}          </p>
        </div>
        <div class="arena-image">
          <img
            src="https://www.myholidaynepal.com/blog/images/blogimage/Kathmandu-Futsal-20130717231003.jpg"
            alt="Omar Dsoky"
          />
                 
        </div>
        <Button variant="alert" onClick={console.log('abc')}>
            
          </Button>
      </div>
     <div  style={{textAlign: "center"}}>
     <Button variant="primary" onClick={() => onCancelBooking(data.id)}> Cancel This Booking</Button>
     </div>
     {show? 
     <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Cancel Booking</Modal.Title>
         </Modal.Header>
         <Modal.Body>{cancelBooking.data.message}</Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             ok
           </Button>

           
         </Modal.Footer>
       </Modal>: ""}
        </div>
        
           )}
           
        </>
    )
}

export default Account
