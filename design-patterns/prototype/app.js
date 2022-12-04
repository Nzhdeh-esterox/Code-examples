var Prototype = /** @class */ (function () {
    function Prototype() {
        this.floorQuantity = 15;
        this.height = 2.70;
    }
    Prototype.prototype.clone = function () {
        return Object.create(this);
    };
    Prototype.prototype.createApartment = function (floor) {
        if (floor < this.floorQuantity) {
            return { floor: floor, height: this.height, floorQuantity: this.floorQuantity };
        }
        return { message: 'Selected floor is not available!', status: false };
    };
    return Prototype;
}());
var prototype1 = new Prototype();
prototype1.height = 3;
var prototype2 = prototype1.clone();
var apartment = prototype2.createApartment(17);
if (prototype1.height === prototype2.height) {
    console.log(' The heights is equal!');
}
else {
    console.log(' The heights is not equal!');
}
