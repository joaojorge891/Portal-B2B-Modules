import { Service } from "src/app/services/service";

export abstract class AccessValidate extends Service {

    constructor(

    ) {
        super()

    }

    protected validateUser() {
        if (this.getCurrentUser().typeUser === 'user' || this.getCurrentUser() === 'null' || this.getCurrentUser().typeUser === undefined || this.getCurrentUser().typeUser === '') {
            return 'user'
        } else return 'admin'

    }

}

