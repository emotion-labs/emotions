import { ModuleType } from '../enum/ModuleType';
import { IComponent } from './component/IComponent';
import { IComponentRenderer } from './component/IComponentRenderer';

export interface IModuleComponent<RENDERER extends IComponentRenderer> extends IComponent<RENDERER> {

    getModuleType(): ModuleType;

}
