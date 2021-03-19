import './App.css';
import React, { useState,useEffect} from "react";
import { useAlert } from 'react-alert';






  const Email =()=>{
    const [rootUrl, setRootUrl] = useState("");
    const [otp,setotp]=useState("")
    const [randomString, setRandomString] = useState("")
    const [show, setShow] = useState(true);
    const [comp,setcomp]=useState("")
    const alert =useAlert()


    useEffect(() => {
      setRandomString(Math.random().toString(36).substring(5).toUpperCase());
     
    }, []);
    
    
    const handleMessageSubmit = () => {
      fetch('https://otp-backend.herokuapp.com/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: rootUrl,
          string: randomString
        })
      }).then((res) => res.json())
      .then((res) =>  alert.show(res.message));
     
    }

    const handlecheckotp = () => {
      fetch('https://otp-backend.herokuapp.com/verify', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: rootUrl,
          pin: otp,
          string: randomString
        })
      }).then((res) => res.json())
      .then((res) => {if(res.message==="account verifed successfully"){
        alert.show(res.message)
        setShow(false)}
        else{alert.show("Incorrect Otp")}
      }
      );  
    }
    const handleupdate = () => {
      fetch('https://otp-backend.herokuapp.com/resigter', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: rootUrl,
          string: randomString,
          complaints: comp
        })
      }).then((res) => res.json())
      .then((res) =>  alert.show(res.message));
    }
    
  return (
    <div className="Container bg-">
      <div className="text-center bg-danger ">
         <h1>Complaint Box</h1>
      </div>
      <div>
        <div class="form-group App">
        <label for="exampleInputEmail1" >Email address</label><br></br>
        <input type="email" class="text-center"  placeholder="Enter email"  onChange={(e) => setRootUrl(e.target.value)}></input><br></br>
        <input
        className="text-center"
        type="text"
        id="rs"
        value={randomString}
        placeholder="Random String"
        onChange={(e) => setRandomString(e.target.value)}
      /><br></br>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small><br></br>
        <button type="button" class="btn btn-primary" onClick={handleMessageSubmit}>Send OTP</button>
        </div>
      </div>
      <div>
      <div class="form-group App">
        <br></br>
        <input type="email" class="text-center"  placeholder="Enter otp" onChange={(e) => setotp(e.target.value)}></input>
        <br></br>
        <button type="button" class="btn btn-primary" onClick={handlecheckotp}>Verify</button>
        {show === true ? (
							<div>
                verify Otp
              </div>
						) : (
						<div className="">
              <h2>Write your Complaint here</h2>
              <input type="text" className="lh-1 text-break text-start form-control form-control-lg word-wrap"  placeholder="Enter complaint" onChange={(e) => setcomp(e.target.value)}></input>
              <br></br>
              <button type="button" class="btn btn-primary" onClick={handleupdate}>resigter</button>
            </div>
						)}
      </div>
      </div>
      <div>

      </div>
     
    </div>
  );
}

export default Email;
