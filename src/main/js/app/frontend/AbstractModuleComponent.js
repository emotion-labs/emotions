import { AbstractComponent } from './AbstractComponent';
import { ModuleType } from '../enum/ModuleType';

/**
 * @template {HTMLElement} VIEW
 * @extends {AbstractComponent<VIEW>}
 */
export class AbstractModuleComponent extends AbstractComponent {

    /** @type {ModuleType} */eModuleType;

    /**
     *
     * @param {ModuleType} _eModule
     */
    constructor(_eModule) {
        super();
        this.eModuleType = _eModule;
    }

    getModuleType() {
        return this.eModuleType;
    }

}
