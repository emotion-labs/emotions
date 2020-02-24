import { ModuleType } from "./enum/ModuleType";
import { IModuleComponent } from './frontend/AbstractModuleComponent';
import { AbstractEventListener } from './misc/AbstractEventListener';

export abstract class AbstractApplication extends AbstractEventListener {
    private mapModules: Map<ModuleType, Set<IModuleComponent>> = new Map();

    protected constructor() {
        super();
    }

    abstract run(): void;

    registerModule(_oModule: IModuleComponent): void {
        this.getModulesByType(_oModule.getModuleType()).add(_oModule);
    }

    protected getModulesByType(_eType: ModuleType): Set<IModuleComponent> {
        if (this.mapModules.has(_eType)) {
            this.mapModules.set(_eType, new Set<IModuleComponent>());
        }
        return this.mapModules.get(_eType)!;
    }

}
