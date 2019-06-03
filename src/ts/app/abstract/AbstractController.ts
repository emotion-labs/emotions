import { AbstractEventListener } from "./AbstractEventListener";

export abstract class AbstractController extends AbstractEventListener {

    constructor() {
        super();
    }

    abstract process(): void;

}
