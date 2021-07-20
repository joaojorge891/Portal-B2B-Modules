import { Service } from "src/app/services/service";

export abstract class AccessValidate extends Service {

    constructor(

    ) {
        super()

    }

    protected validateUser() {
        const typeUser = this.getCurrentUser().typeUser
        if (typeUser === 'user' || typeUser === 'null' || typeUser === undefined || typeUser === '') {
            return 'user'
        } else return 'admin'

    }

}

