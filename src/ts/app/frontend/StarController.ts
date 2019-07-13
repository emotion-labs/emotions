import { AbstractComponent } from "../abstract/AbstractComponent";
import { IComponentRenderer } from "../abstract/AbstractComponentRenderer";

export class StarController extends AbstractComponent {

    constructor() {
        super();
    }

    getRenderer(): IComponentRenderer {
        throw new Error("Method not implemented.");
    }

}
