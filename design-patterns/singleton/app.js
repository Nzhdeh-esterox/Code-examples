var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    return Singleton;
}());
var instance1 = Singleton.getInstance();
var instance2 = Singleton.getInstance();
if (instance1 === instance2) {
    console.log(' 1111111111111111');
}
else {
    console.log(' 2222222222222222');
}
