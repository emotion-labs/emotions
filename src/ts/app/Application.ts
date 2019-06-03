import { PageController as PageController } from "./frontend/PageController";
import { AbstractApplication } from "./abstract/AbstractApplication";

export class Application extends AbstractApplication {
    private page: PageController;

    constructor() {
        super();
    }

    run() {
        this.page = new PageController();

    }

}
