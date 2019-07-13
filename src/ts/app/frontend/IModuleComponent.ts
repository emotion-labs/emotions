import { ModuleType } from '../enum/ModuleType';
import { IComponent } from './component/IComponent';

export interface IModuleComponent extends IComponent {

    getModuleType(): ModuleType;

}
