import { AbstractEventListener } from "./AbstractEventListener";

export interface IView {

    render(): void;

}

export abstract class AbstractView extends AbstractEventListener implements IView {

    constructor() {
        super();
    }

    abstract render(): void;

}
