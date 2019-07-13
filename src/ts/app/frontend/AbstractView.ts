import { AbstractEventListener } from "./AbstractEventListener";

export abstract class AbstractView extends AbstractEventListener {

    constructor() {
        super();
    }

    abstract render(): void;

}
