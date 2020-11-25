import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./styles.css";

export default function Header () {
    const [loggedIn, setLoggedIn] = useState(true);

    function handleLogOut() {
        localStorage.setItem("logged_in", false);
    }

    useEffect(() => {
        if (localStorage.getItem("logged_in") !== "true") {
            setLoggedIn(false);
        }
    }, [])

    return (
        <div className="header">
            {!loggedIn ? <Redirect to="/login"/> : null}
            <h1 className="logoText">
                Lighthouse Rides
            </h1>

            <ul className="navBarList">
                <NavLink to="/admin" className="navBarOption">Manage Rides</NavLink>
                <NavLink to="/view" className="navBarOption">View Rides</NavLink>
                <NavLink to="/login" className="navBarOption" onClick={handleLogOut}>Log Out</NavLink>
            </ul>
        </div>
    )
}