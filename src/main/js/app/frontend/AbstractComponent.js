import { AbstractEventListener } from '../misc/AbstractEventListener';

/**
 * @template {HTMLElement} VIEW
 */
export class AbstractComponent extends AbstractEventListener {

    /** @type {VIEW} */ oView = null;

    constructor() {
        super();
    }

    /**
     * @returns {VIEW}
     */
    createView() {
        throw new Error("not implemented!");
    }

    hasView() {
        return (this.oView instanceof HTMLElement);
    }

    /**
     *
     * @returns {VIEW}
     */
    getView() {
        if (!this.hasView()) {
            this.oView = this.createView();
        }
        return this.oView;
    }

}
