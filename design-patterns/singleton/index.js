const Singleton = (function () {
    let instance;

    function createInstance () {
        return {};
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        }
    }
})()

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

if (instance1 === instance2) {
    console.log(' 1111111111111111');
} else {
    console.log(' 2222222222222222');
}