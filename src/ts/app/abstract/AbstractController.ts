import { AbstractEventListener } from "./AbstractEventListener";
import { IView } from "./AbstractView";

export abstract class AbstractController extends AbstractEventListener {

    constructor() {
        super();
    }

    abstract process(_oData: any): void;

    abstract getView(): IView;
}
