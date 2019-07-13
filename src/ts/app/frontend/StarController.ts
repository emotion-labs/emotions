import { AbstractComponent } from './component/AbstractComponent';
import { IComponentRenderer } from './component/IComponentRenderer';

export class StarController extends AbstractComponent {

    constructor() {
        super();
    }

    getRenderer(): IComponentRenderer {
        throw new Error("Method not implemented.");
    }

}
