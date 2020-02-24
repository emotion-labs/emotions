import { ModuleType } from "./enum/ModuleType";
import { AbstractEventListener } from './misc/AbstractEventListener';
import { AbstractModel } from "./model/AbstractModel";
import { AbstractComponent } from "./frontend/AbstractComponent";
import { AbstractModuleComponent } from "./frontend/AbstractModuleComponent";
// import i18next from "i18next";
// import I18NextXhrBackend from "i18next-xhr-backend";

/**
 *
 *
 * @export
 * @class AbstractApplication
 * @extends {AbstractEventListener}
 */
export class Application extends AbstractEventListener {

    static oInstance = null;

    /** @type {Map<ModuleType, Set<AbstractComponent>>} */ mapModules = new Map();
    /** @type {AbstractModuleComponent} */ oLayout;

    /**
     * @template {Application} APP
     * @returns {APP}
     */
    static instance() {
        if (this.oInstance === null) {
            let oInstance = new this();
            if (Application.oInstance !== null) {
                throw new Error("Application already initialized!");
            }
            Application.oInstance = oInstance;
            this.oInstance = oInstance;
        }
        return this.oInstance;
    }

    constructor() {
        super();
        if (this.constructor === Application.constructor) {
            throw new Error("Application must be implemented first!");
        }
    }

    getI18NextOptions() {
        return {
            lng: 'de',
            debug: true,
            backend: {
                loadPath: '/locales/{{lng}}-{{ns}}.json'
            }
        };
    }

    run() {
        // load languages
        // i18next.use(I18NextXhrBackend).init(this.getI18NextOptions());

        // select layout
        let oLayout = null;
        if (!(this.oLayout instanceof AbstractModuleComponent)
            || this.oLayout.getModuleType() !== ModuleType.LAYOUT) {
            let setLayouts = this.getModulesByType(ModuleType.LAYOUT);
            if (setLayouts.size > 0) {
                oLayout = setLayouts.values().next().value;
            }
        }
        this.switchLayout(oLayout);
    }

    switchLayout(_oLayout) {
        if ((_oLayout instanceof AbstractModuleComponent)
            && _oLayout.getModuleType() === ModuleType.LAYOUT) {
            this.oLayout = _oLayout;
        }
        if (!(this.oLayout instanceof AbstractModuleComponent)
            || this.oLayout.getModuleType() !== ModuleType.LAYOUT) {
            throw new Error("missing application layout!");
        }
        let sName = this.constructor.name;
        let oContainer = document.querySelector("#" + sName)
        if (!(oContainer instanceof HTMLElement)) {
            oContainer = document.createElement("div");
            oContainer.id = sName;
            document.body.append(oContainer);
        }
        let oElm = this.oLayout.getView();
        if (oElm != null) {
            if (oContainer.hasChildNodes()) {
                oContainer.replaceChild(oElm, oContainer.children.item(0));
            } else {
                oContainer.append(oElm);
            }
        }
    }

    /**
     *
     * @param {AbstractModuleComponent} _oModule
     */
    registerModule(_oModule) {
        this.getModulesByType(_oModule.getModuleType()).add(_oModule);
    }

    /**
     *
     * @param {ModuleType} _eType
     * @returns {Set<AbstractModel>}
     */
    getModulesByType(_eType) {
        if (!this.mapModules.has(_eType)) {
            this.mapModules.set(_eType, new Set());
        }
        return this.mapModules.get(_eType);
    }

}
