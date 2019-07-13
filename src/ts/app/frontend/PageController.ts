import { AbstractComponent } from './component/AbstractComponent';
import { IComponentRenderer } from './component/IComponentRenderer';

export class PageController extends AbstractComponent {

    constructor() {
        super();
    }

    getRenderer(): IComponentRenderer {
        throw new Error("Method not implemented.");
    }

}
