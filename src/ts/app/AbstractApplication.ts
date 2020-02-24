import { ModuleType } from "./enum/ModuleType";
import { IApplication } from "./IApplication";
import { AbstractEventListener } from './misc/AbstractEventListener';
import { IModuleComponent } from './frontend/IModuleComponent';

export abstract class AbstractApplication extends AbstractEventListener implements IApplication {
    private mapModules: Map<ModuleType, Set<IModuleComponent>> = new Map();

    protected constructor() {
        super();
    }

    abstract run(): void;

    public registerModule(_oModule: IModuleComponent): void {
        this.getModulesByType(_oModule.getModuleType()).add(_oModule);
    }

    public getModulesByType(_eType: ModuleType): Set<IModuleComponent> {
        if (this.mapModules.has(_eType)) {
            this.mapModules.set(_eType, new Set<IModuleComponent>());
        }
        return this.mapModules.get(_eType)!;
    }

}
