import { AbstractEventListener } from "./AbstractEventListener";
import { IComponentRenderer } from "./AbstractComponentRenderer";

export interface IComponent {
    getRenderer(): IComponentRenderer;
}

export abstract class AbstractComponent extends AbstractEventListener implements IComponent {

    constructor() {
        super();
    }

    abstract getRenderer(): IComponentRenderer;
}
