import { AbstractComponent } from "./AbstractComponent";
import { IComponentRenderer } from './IComponentRenderer';
import { AbstractRenderer as AbstractComponentRenderer } from './AbstractComponentRenderer';

export class InteractiveRadioChart extends AbstractComponent {

    private oRenderer: IComponentRenderer | null = null;

    getRenderer(): IComponentRenderer {
        if (this.oRenderer === null) {
            this.oRenderer = new InteractiveRadioChartRenderer();
        }
        return this.oRenderer;
    }

}

class InteractiveRadioChartRenderer extends AbstractComponentRenderer {

    render(): HTMLElement {
        throw new Error("Method not implemented.");
    }

}
