import { AbstractModuleController } from "../abstract/AbstractModuleController";
import { ModuleType } from "../../enum/ModuleType";
import { AbstractView } from "../abstract/AbstractView";

export class MenuController extends AbstractModuleController {

    constructor() {
        super();
    }

    getModuleType(): ModuleType {
        throw new Error("Method not implemented.");
    }

    process(_oData: any): void {
        throw new Error("Method not implemented.");
    }

    getView(): AbstractView {
        throw new Error("Method not implemented.");
    }


}
