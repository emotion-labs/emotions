import { ModuleType } from "../enum/ModuleType";
import { AbstractComponent } from './component/AbstractComponent';
import { IModuleComponent } from './IModuleComponent';
import { IComponentRenderer } from './component/IComponentRenderer';

export abstract class AbstractModuleComponent<RENDERER extends IComponentRenderer> extends AbstractComponent<RENDERER> implements IModuleComponent<RENDERER> {

    protected constructor() {
        super();
    }

    public abstract getModuleType(): ModuleType;

}
