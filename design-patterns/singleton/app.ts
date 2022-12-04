class Singleton {
    public static instance: Singleton;

    private constructor() {
    }

    public static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

if (instance1 === instance2) {
    console.log(' 1111111111111111');
} else {
    console.log(' 2222222222222222');
}


