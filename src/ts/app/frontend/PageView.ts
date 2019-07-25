import { AbstractComponentRenderer } from './component/AbstractComponentRenderer';

export class PageView extends AbstractComponentRenderer {

    constructor() {
        super();
    }

    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }

}
