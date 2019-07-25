import { AbstractEventListener } from '../../misc/AbstractEventListener';
import { IComponentRenderer } from './IComponentRenderer';

export abstract class AbstractComponentRenderer extends AbstractEventListener implements IComponentRenderer {

    constructor() {
        super();
    }

    abstract render(): HTMLElement;

}
