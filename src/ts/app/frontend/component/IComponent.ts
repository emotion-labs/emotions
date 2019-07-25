import { IComponentRenderer } from './IComponentRenderer';

export interface IComponent<RENDERER extends IComponentRenderer> {

    getRenderer(): RENDERER;

}
