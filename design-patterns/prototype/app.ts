class Prototype {
    private floorQuantity = 15;
    public height = 2.70;

    public clone(): this {
        return Object.create(this);
    }

    public createApartment (floor) {
        if (floor < this.floorQuantity) {
            return {floor: floor, height: this.height, floorQuantity: this.floorQuantity}
        }

        return {message: 'Selected floor is not available!', status: false}
    }
}

const prototype1 = new Prototype();
prototype1.height = 3;
const prototype2 = prototype1.clone();
const apartment = prototype2.createApartment(17);

if (prototype1.height === prototype2.height) {
    console.log(' The heights is equal!');
} else {
    console.log(' The heights is not equal!');
}

