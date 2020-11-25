import Car from "../components/admin/Car";

export async function updateCars(cars) {
    await deleteAllCars();
    await addCars(cars);
}

export async function deleteAllCars() {
    let allCars = await getAllCars();
    return allCars.map((car) => {
        deleteCarByID(car.id);
    })
}

export async function getAllCars() {
    return fetch("/api/cars", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        let newCars = response.map((car) => {
            // id, pickupLocations, pickupTime, driver, passengers
            let newCar = new Car(car.id, car.pickupLocations, car.pickupTime, car.driver, car.passengers);
            console.log(newCar);
            return newCar;
        })

        console.log(newCars)
        return newCars;
    });
}

export function deleteCarByID(id) {
    return fetch(`/api/cars/${id}`, {
        method: "delete",
    })
}

export function addCars(cars) {
    cars.map((car) => {
        addCar(car);
    })
}

export function addCar(car) {
    let data = {
        pickupLocations: car.pickupLocations,
        driver: car.driver,
        passengers: car.passengers,
        pickupTime: car.pickupTime,
        capacity: car.capacity,
        count: car.count,
    }


    return fetch("/api/cars", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        return response;
    })
}


