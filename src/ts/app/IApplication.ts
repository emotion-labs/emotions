import { IModuleComponent } from './frontend/IModuleComponent';
import { ModuleType } from './enum/ModuleType';

export interface IApplication {

    run(): void;

    registerModule(_oModule: IModuleComponent): void;

    getModulesByType(_eType: ModuleType): Set<IModuleComponent>;

}
