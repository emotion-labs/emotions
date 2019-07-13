import { IModuleComponent } from './frontend/IModuleComponent';

export interface IApplication {

    run(): void;

    registerModule(_oModule: IModuleComponent): void;

}
