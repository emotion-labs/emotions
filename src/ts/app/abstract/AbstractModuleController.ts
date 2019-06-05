import { ModuleType } from "../../enum/ModuleType";
import { AbstractController } from "./AbstractController";
import { IView } from "./AbstractView";

export interface IModule {

    process(_oData: any): void;

    getView(): IView;

    getModuleType(): ModuleType;

}

export abstract class AbstractModuleController extends AbstractController implements IModule {

    constructor() {
        super();
    }

    abstract getModuleType(): ModuleType;

}
