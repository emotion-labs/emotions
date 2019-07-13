import { ModuleType } from "../enum/ModuleType";
import { AbstractComponent, IComponent } from "./AbstractComponent";

export interface IModuleComponent extends IComponent {

    getModuleType(): ModuleType;

}

export abstract class AbstractModuleComponent extends AbstractComponent implements IModuleComponent {

    constructor() {
        super();
    }

    abstract getModuleType(): ModuleType;

}
