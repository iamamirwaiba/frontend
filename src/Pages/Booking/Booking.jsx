import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Booking.css";
import dateFormat from 'dateformat'
import { Modal } from "react-bootstrap";


import axios from "axios";
import PopUp from "../../components/popUp/popUp";
import NavBar from "../../components/NavBar";

function Booking() {

  const getUserId = localStorage.getItem('user_id')
  const [arenaData, setArenaData] = useState([]);
  const [key, setKey] = useState(0);
  const [show, setShow] = useState(false);
  const [bookingMsg, setBookingMsg] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [getValue, setValue] = useState({
    ground_id: "",
    BookedDate:"",
    BookedTime: "",

    "unwanted": "",
    user_id: getUserId

  })
  if(getValue.BookedDate) {
    const dateObj = new Date(getValue.BookedDate)
  
const computedDate = dateFormat(dateObj, 'mm/dd/yyyy');
    
// paddedShortDate    

  }

  var dtToday = new Date();
    
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var maxday = dtToday.getDate()+ 3;
  var year = dtToday.getFullYear();
  if(month < 10)
      month = '0' + month.toString();
  if(day < 10)
      day = '0' + day.toString();
  if(maxday < 10)
      maxday = '0' + maxday.toString();
  
  const minDate= year + '-' + month + '-' + day;
  const maxDate= year + '-' + month + '-' + maxday;
  console.log(maxDate)
  useEffect( () => {
    const fetchAllData = async() => {
  await axios.get("http://localhost:8080/api/v1/public/findAll")
            .then((response) => {
           
              setArenaData(response.data);
            });
          }
          fetchAllData()

  },[] );

console.log(key)
  const [bookId,setBookId] = useState([]);
const postId = (id) => {
 axios.post("http://localhost:8080/api/v1/public/getbyFutsalid" , {"futsal_id":id})
        .then(async (resp) => {
          
          if((resp.data.length) > 0 ){
         const a = resp.data
          const b = a[key].ground_id
          const stringed = b.toString()
         
         setValue({...getValue, "ground_id":  stringed})
        
          setBookId(resp.data)
        } else { 
          return 'no data'
        }
        })

}
const onChangeHandler2 = (e) => {
  const dateObj = new Date(e.target.value)
  const computedDate = dateFormat(dateObj, 'mm/dd/yyyy');

  setValue({...getValue, [e.target.name]:computedDate})
}
const onChangeHandler = (e) => {
  setValue({getValue, [e.target.name]: e.target.value})

  postId(e.target.value)

}

const onTimeChangeHandler = (e) => {
  setValue({...getValue, [e.target.name]: e.target.value})

}
const onChangeHandler1 =(e) => {
  setKey(e.target.value)
  setValue({...getValue, [getValue.ground_id]:bookId[key].ground_id})
}
const onSubmit =async() => {
  
console.log(show)
const stringifyUser = getUserId.toString()
const stringifyBookedDate = getValue.BookedDate.toString()
const stringifyBookedTime = getValue.BookedTime.toString()
const stringifyGroundId = getValue.ground_id.toString()
if(getValue.BookedDate === ""){

  alert('Booked date is empty')
  return ""
}
else if(getValue.ground_id === ""){
  alert('Please choose Arena')
  return ""
}
else if(getValue.BookedTime === ""){
  alert('Please choose Time')
  return ""
}
else{
  setShow(true)

  const bookingDone = await axios.post("http://localhost:8080/api/v1/public/book" ,{"ground_id":stringifyGroundId, 
"user_id": stringifyUser, "BookedDate": stringifyBookedDate, "BookedTime":stringifyBookedTime

} )
console.log(bookingDone.data.message)
setBookingMsg(bookingDone.data.message)
setShow(true)

if(bookingDone.status===200){

  setShow(true)


}
else{
  
  alert('something went wrong')
}
}
}

  return (<>
  
    <NavBar />
    <div className="book-form" style={{textAlign: "center"}}>
      <Container style={{ border: "1px solid black", marginTop: "20%" }}>
        <h1 style={{ color: "Black", marginTop: "20px" }}>Book Your Arena</h1>
        <hr />
        <Row className="mb-5">
          <Form.Group as={Col} controlId="formGridState">
            <h3>Select Arena</h3>
            <Form.Select name="unwanteds"  onChange = {(e) => onChangeHandler(e)}>
            <option selected>Choose Arena</option>

              {arenaData?.map((bookData) => 
                <option value={bookData.id}>{bookData.name}</option>
              )}
              
            </Form.Select >
            {bookId.length>0 ? (<>
            <h3>Select Ground</h3>

            
            <Form.Select name="ground_id" onChange = {(e) => onChangeHandler1(e)}>
              {bookId.map((groundId, key)=>
                  <option value={key}>{key+1}</option>
              )}
            </Form.Select></>

            ): ""}
                                    <br/>

            <h3>Select Date</h3>
            
            <input type="date" name="BookedDate" min={minDate} max={maxDate} onChange={(e) => onChangeHandler2(e)} placeholder="Select Date" />
            <br/>
            <br/>
 <label for="cars"><h3>Select Time</h3></label> 

 <select name="BookedTime" onChange={(e) => onTimeChangeHandler(e)} value={getValue.BookedTime} class="form-select" aria-label="Default select example">

  <option selected>Choose time</option>
  <option value="7">7:00-8:00</option>
  <option value="8">8:00-9:00</option>
  <option value="9">9:00-10:00</option>
  <option value="11">11:00-12:00</option>
  <option value="12">12:00-1:00</option>
  <option value="13">1:00-2:00</option>
  <option value="14">2:00-3:00</option>
  <option value="15">3:00-4:00</option>
  <option value="16">4:00-5:00</option>
  <option value="17">5:00-6:00</option>
  <option value="18">6:00-7:00</option>
  <option value="19">7:00-8:00</option>
</select>
          </Form.Group>

        </Row>
        <div style={{ paddingBottom :"10px"}}>
        <Button onClick = {() => onSubmit()} variant="dark" style={{ margin: "10%" ,paddingBottom :"10px"}}>
          Book Now
        </Button>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bookingMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div></>
  );
}

export default Booking;
