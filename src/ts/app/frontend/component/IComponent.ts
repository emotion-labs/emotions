import { IComponentRenderer } from './IComponentRenderer';

export interface IComponent {

    getRenderer(): IComponentRenderer;

}
