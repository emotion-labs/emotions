import { AbstractEventListener } from '../../misc/AbstractEventListener';
import { IComponentRenderer } from './IComponentRenderer';
import { IComponent } from './IComponent';

export abstract class AbstractComponent<RENDERER extends IComponentRenderer> extends AbstractEventListener implements IComponent<RENDERER> {

    private oRenderer: RENDERER | null = null;

    constructor() {
        super();
    }

    protected abstract createRenderer(): RENDERER;

    hasRenderer(): boolean {
        return (this.oRenderer === null);
    }

    getRenderer(): RENDERER {
        if (!this.hasRenderer()) {
            this.oRenderer = this.createRenderer();
        }
        return this.oRenderer!;
    }

}
