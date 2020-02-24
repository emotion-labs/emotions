import { AbstractModuleComponent } from "../AbstractModuleComponent";
import { ModuleType } from "../../enum/ModuleType";
import { HtmlUtil } from "../../misc/HtmlUtil";
import { AbstractEventListener } from "../../misc/AbstractEventListener";

/**
 * @extends {AbstractModuleComponent<SimpleLayoutView>}
 */
export class SimpleLayout extends AbstractModuleComponent {

    constructor() {
        super(ModuleType.LAYOUT);
    }

    createView() {
        const oContainer = new SimpleLayoutView();
        oContainer.addGetDataEventListener((...data) => { return this.getData.apply(this, data); })
        return oContainer;
    }

    getData() {

    }


}

class SimpleLayoutView extends HTMLDivElement {

    static EVENT_GET_DATA = Symbol("EVENT_GET_DATA");

    /** @type {AbstractEventListener} */ oEventProvider;

    constructor() {
        HtmlUtil.checkRegistration(SimpleLayout.getClassFullExternalName(), SimpleLayoutView, { extends: "div" });
        super();
        this.oEventProvider = new AbstractEventListener();
        this.oEventProvider.registerEvent(SimpleLayoutView.EVENT_GET_DATA);
    }

    addGetDataEventListener(_listener) {
        return this.oEventProvider.addEventListener(SimpleLayoutView.EVENT_GET_DATA, _listener, 0);
    }

    removeGetDataEventListener(_listener) {
        return this.oEventProvider.removeEventListener(SimpleLayoutView.EVENT_GET_DATA, _listener);
    }

}
