import { ModuleType } from "../enum/ModuleType";
import { AbstractComponent } from './component/AbstractComponent';
import { IModuleComponent } from './IModuleComponent';

export abstract class AbstractModuleComponent extends AbstractComponent implements IModuleComponent {

    constructor() {
        super();
    }

    abstract getModuleType(): ModuleType;

}
