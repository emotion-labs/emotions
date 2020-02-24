import { Application } from "./Application";
import { SimpleLayout } from "./frontend/layout/SimpleLayout";

/**
 *
 *
 * @export
 * @class EmotionApplication
 * @extends {Application}
 */
export class EmotionApplication extends Application {

    run() {
        this.registerModule(new SimpleLayout());
        super.run();
    }

}
