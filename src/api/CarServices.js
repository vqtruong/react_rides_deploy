import Car from "../components/admin/Car";

export async function updateCars(cars) {
    await deleteAllCars();
    await addCars(cars);
}

export async function deleteAllCars() {
    let allCars = await getAllCars();
    return allCars.foreach((car) => {
        deleteCarByID(car.id);
    })
}

export async function getAllCars() {
    return fetch("/cars", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        let newCars = response.map((car) => {
            let newCar = new Car(car.id, car.pickupLocations, car.pickupTime, car.driver, car.passengers);
            return newCar;
        })
        return newCars;
    });
}

export function deleteCarByID(id) {
    return fetch(`/cars/${id}`, {
        method: "delete",
    })
}

export function addCars(cars) {
    cars.foreach((car) => {
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


    return fetch("/cars", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        return response;
    })
}


