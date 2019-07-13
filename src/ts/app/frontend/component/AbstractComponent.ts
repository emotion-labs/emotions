import { AbstractEventListener } from '../../misc/AbstractEventListener';
import { IComponentRenderer } from './IComponentRenderer';
import { IComponent } from './IComponent';

export abstract class AbstractComponent extends AbstractEventListener implements IComponent {

    constructor() {
        super();
    }

    abstract getRenderer(): IComponentRenderer;
}
