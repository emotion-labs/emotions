import { AbstractModuleComponent } from "../abstract/AbstractModuleComponent";
import { ModuleType } from "../enum/ModuleType";
import { AbstractRenderer as AbstractRenderer } from "../abstract/AbstractComponentRenderer";

export class MenuController extends AbstractModuleComponent {

    constructor() {
        super();
    }

    getModuleType(): ModuleType {
        throw new Error("Method not implemented.");
    }

    getRenderer(): AbstractRenderer {
        throw new Error("Method not implemented.");
    }


}
