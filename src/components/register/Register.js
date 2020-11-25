import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import User from "../admin/User";
import { addUser } from "../../api/UserServices";
import { Alert } from 'react-bootstrap';
import "./styles.css";

export default function Register () {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [pickupLocation, setPickupLocation] = useState("EVK");
    const [canDrive, setCanDrive] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePhoneChange(event) {
        setPhone(event.target.value);
    }

    function handlePickupLocationChange(event) {
        console.log(event.target.value);
        setPickupLocation(event.target.value);
    }

    function handleCanDriveChange(event) {
        setCanDrive(event.target.checked);
    }

    function handleSubmit(e) {
        let valid = false;

        // 
        if (name.trim().length === 0) {
            // setName
            setNameError(true);
            setTimeout(() => { setNameError(false) }, 3000);
        }

        if (email.trim().length === 0 || !email.includes('@')) {
            // setName
            setEmailError(true);
            setTimeout(() => { setEmailError(false) }, 3000);
        }

        if (phone.trim().length === 0) {
            // setName
            setPhoneError(true);
            setTimeout(() => { setPhoneError(false) }, 3000);
        }



        if (valid) {
            let newUser = new User({
                "name": name,
                "phone": phone,
                "email": email,
                "pickupLocation": pickupLocation,
                "assigned": false,
                "canDrive": canDrive,
            })
            addUser(newUser);
        }
        e.preventDefault();
        
    }

    useEffect(() => {
        if (localStorage.getItem("logged_in") === "true") {
            setLoggedIn(true);
        }
    }, [])

    return (
        <div id="register">
            {loggedIn ? <Redirect to="/admin"/> : null}

            <h1> Lighthouse Rides </h1>
            <form>
                <div className="center">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="name" className="form-control" value={name} onChange={handleNameChange} id="name" placeholder="Enter your name..."/>
                        { nameError && 
                            <Alert className="alert-box" variant="danger">
                                Please enter a name.
                            </Alert>
                        }
                            
                    </div>

                    

                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" className="form-control" value={email} onChange={handleEmailChange} id="email" placeholder="Enter your email..."/>
                        { emailError && 
                            <Alert className="alert-box" variant="danger">
                                Please enter a valid email.
                            </Alert>
                        }
                    
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Phone</label>
                        <input type="text" className="form-control" value={phone} onChange={handlePhoneChange} id="phone" placeholder="Enter your phone..."/>
                        { emailError && 
                            <Alert className="alert-box" variant="danger">
                                Please only enter digits..
                            </Alert>
                        }
                    
                    </div>

                    <div className="form-group">
                        <label htmlFor="pickupLocations">Pickup Locations</label>
                        <select className="form-control" id="pickupLocations" onChange={handlePickupLocationChange}>
                            <option>EVK</option>
                            <option>Village</option>
                            <option>Parkside</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" onChange={handleCanDriveChange} id="defaultCheck1"></input>
                            <label class="form-check-label" htmlFor="defaultCheck1" > Are you able to drive? </label>
                        </div>
                    </div>

                    
                </div>
                    
                <div className="submit-row">    
                    <button type="submit" className="btn btn-success" id="submit-btn"> 
                        <Link to="./admin" className="navLink" onClick={handleSubmit}>
                            Register
                        </Link>
                    </button>
                </div>
                <small id="login" className="form-text text-muted">Already have an account? Login <a href="./login">here.</a></small>
            </form>
            
        </div>
    )
}