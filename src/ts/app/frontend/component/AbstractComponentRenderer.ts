import { AbstractEventListener } from "./AbstractEventListener";

export interface IComponentRenderer {

    render(): void;

}

export abstract class AbstractRenderer extends AbstractEventListener implements IComponentRenderer {

    constructor() {
        super();
    }

    abstract render(): void;

}
