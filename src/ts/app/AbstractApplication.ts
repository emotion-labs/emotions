import { AbstractEventListener } from "./abstract/AbstractEventListener";
import { IModuleComponent } from "./abstract/AbstractModuleComponent";
import { ModuleType } from "./enum/ModuleType";
import { IApplication } from "./IApplication";

export abstract class AbstractApplication extends AbstractEventListener implements IApplication {
    private mapModules: Map<ModuleType, Set<IModuleComponent>> = new Map();

    constructor() {
        super();
    }

    abstract run(): void;

    registerModule(_oModule: IModuleComponent): void {
        this.getModulesByType(_oModule.getModuleType()).add(_oModule);
    }

    getModulesByType(_eType: ModuleType): Set<IModuleComponent> {
        if (this.mapModules.has(_eType)) {
            this.mapModules.set(_eType, new Set<IModuleComponent>());
        }
        return this.mapModules.get(_eType)!;
    }

}
