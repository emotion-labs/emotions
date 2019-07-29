import { ModuleType } from "../enum/ModuleType";
import { AbstractModuleComponent } from './AbstractModuleComponent';
import { IComponentRenderer } from './component/IComponentRenderer';
import { AbstractComponentRenderer } from './component/AbstractComponentRenderer';
import { EmotionApplication } from '../EmotionApplication';
import { IModuleComponent } from './IModuleComponent';

export class MenuComponent extends AbstractModuleComponent<IComponentRenderer> {

    public constructor() {
        super();
    }

    public getModuleType(): ModuleType {
        return ModuleType.MENU;
    }

    protected createRenderer(): MenuComponentRenderer {
        let oRenderer = new MenuComponentRenderer();
        return oRenderer;
    }

    protected getContentModules(): Set<IModuleComponent<IComponentRenderer>> {
        let oApp = EmotionApplication.instance();
        return oApp.getModulesByType(ModuleType.CONTENT);
    }

}

class MenuComponentRenderer extends AbstractComponentRenderer {

    private oTop: HTMLElement = document.createElement("section");

    private recalc(): void {

    }

    render(): HTMLElement {
        this.recalc();
        return this.getTop();
    }

    private getTop() {
        return this.oTop;
    }

}