export default class User {
    // constructor(name, phone, id, pickupLocation) {
    //     this.name = name;
    //     this.phone = phone;
    //     this.id = id;
    //     this.pickupLocation = pickupLocation;
    //     this.assigned = false;
    // }

    constructor(user) {
        this.name = user.name;
        this.phone = user.phone;
        this.email = user.email;
        this.id = user.id;
        this.pickupLocation = user.pickupLocation;
        this.assigned = user.assigned;
        this.canDrive = user.canDrive;
    }

    reset() {
        this.name = "None";
        this.phone = "None";
        this.email = "None";
        this.id = null;
        this.assigned = false;
        this.pickupLocation = undefined;
    }
}

