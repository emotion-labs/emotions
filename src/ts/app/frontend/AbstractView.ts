import { AbstractEventListener } from '../misc/AbstractEventListener';

export abstract class AbstractView extends AbstractEventListener {

    constructor() {
        super();
    }

    abstract render(): void;

}
