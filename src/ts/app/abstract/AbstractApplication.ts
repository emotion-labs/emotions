import { AbstractEventListener } from "./AbstractEventListener";
import { IModule } from "./AbstractModuleController";
import { ModuleType } from "../../enum/ModuleType";

export interface IApplication {

    run(): void;

    registerModule(_oModule: IModule): void;

    getModulesByType(_eType: ModuleType): IModule[];

}

export abstract class AbstractApplication extends AbstractEventListener {

    private mapModules: Map<ModuleType, IModule[]> = new Map();

    constructor() {
        super();

        for (const eType in ModuleType) {

        }
    }

    abstract run(): void;


    getModulesByType(_eType: ModuleType): IModule[] {
        if (this.mapModules.has(_eType)) {
            this.mapModules.set(_eType, []);
        }
        return this.mapModules.get(_eType)!;
    }
}
