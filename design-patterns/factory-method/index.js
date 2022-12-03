const Factory = function () {
    this.createUser = function (type) {
        let user;

        switch (type) {
            case 'admin':
                user = new CreateAdmin();
                break;
            case 'user':
                user = new CreateUser();
                break;
            case 'partner':
                user = new CreatePartner();
                break
        }

        user.type = type;

        user.checkUser = function () {
            user.sourcePath = `mainPath\/${this.type}/`;
        }

        return user;
    }
}

function CreateUser() {
    this.role = 'read';
}

function CreateAdmin() {
    this.role = 'read';
}

function CreatePartner() {
    this.role = 'edit';
}

function createUsers() {
    const factory = new Factory();
    const users = [];

    const admin = factory.createUser('admin');
    admin.checkUser();
    users.push(admin);

    const user = factory.createUser('user');
    users.push(user);

    const partner = factory.createUser('partner');
    users.push(partner);

    return users;
}

createUsers();
