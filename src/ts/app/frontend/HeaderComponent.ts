import { ModuleType } from "../enum/ModuleType";
import { AbstractModuleComponent } from './AbstractModuleComponent';
import { IComponentRenderer } from './component/IComponentRenderer';

export class HeaderComponent extends AbstractModuleComponent<IComponentRenderer> {

    constructor() {
        super();
    }

    getModuleType(): ModuleType {
        return ModuleType.HEADER;
    }

    protected createRenderer(): IComponentRenderer {
        throw new Error("Method not implemented.");
    }

}
