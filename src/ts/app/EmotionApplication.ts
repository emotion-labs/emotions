import { AbstractApplication } from "./AbstractApplication";
import { IApplication } from "./IApplication";

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

    }

}
