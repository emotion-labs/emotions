import { Application } from "../Application";

export class AbstractObject {

    static getClassFullExternalName() {
        if (this === Application || this.constructor === Application) {
            return this.constructor.name;
        } else {
            return (Application.instance().constructor.name + '-' + this.name);
        }
    }

}
