import React, { useState, useEffect } from "react";
import CarList from "../car/CarList";
import Car from "../admin/Car"
import { getAllCars } from "../../api/CarServices";

import "./styles.css";

export default function ViewRides () {
    // getAllUsers().then((rsp) => {
    //     setUsers(rsp);
    // });

    const emptyJSON = {
        "id": null,
        "name": "None",
        "phone": "None",
        "pickupLocation": null,
        "assigned": false,
        "canDrive": false,
    }

    let initialCars = [
        new Car(0, ["EVK"], "8:20AM", emptyJSON, [emptyJSON, emptyJSON, emptyJSON, emptyJSON]),
        // new Car(1, ["Village"], "8:20AM", initialUsers[4], initialUsers.slice(0, 4))
    ]

    const [cars, setCars] = useState(initialCars);

    useEffect(() => {
        console.log(cars);

        getAllCars().then((rsp) => {
            setCars(rsp);
        })
    }, [])

    return (
        <div className="">
            <CarList cars={cars} setCars={setCars} viewOnly={true}/>
        </div>
    )
}