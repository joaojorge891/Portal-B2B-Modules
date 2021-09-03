import { Service } from "src/app/services/service";

export abstract class AccessValidate extends Service {

    constructor(

    ) {
        super()

    }

    protected validateUser() {
        const userData = {}
        this.getCurrentUser().typeUser
        if (this.getCurrentUser().typeUser === 'user' || this.getCurrentUser().typeUser === 'null' || this.getCurrentUser().typeUser === undefined || this.getCurrentUser().typeUser === '') {
            return 'user'
        } else return 'admin'

    }

}

