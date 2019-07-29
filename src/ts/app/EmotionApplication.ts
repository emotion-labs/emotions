import { AbstractApplication } from "./AbstractApplication";
import { HeaderComponent } from './frontend/HeaderComponent';
import { IApplication } from "./IApplication";
import { MenuComponent } from './frontend/MenuComponent';

export class EmotionApplication extends AbstractApplication {
    private static oInstance: IApplication;

    static instance(): IApplication {
        if (this.oInstance === null) {
            this.oInstance = new this();
        }
        return this.oInstance;
    }

    private constructor() {
        super();
    }

    run(): void {
        this.registerModule(new MenuComponent());
        this.registerModule(new HeaderComponent());
    }

}
