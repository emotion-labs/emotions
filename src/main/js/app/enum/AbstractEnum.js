import { AbstractObject } from "../misc/AbstractObject";

/**
 *
 * @export
 * @class AbstractEnum
 * @template {AbstractEnum<TYPE>} TYPE
 */
export class AbstractEnum extends AbstractObject {

    static arrValues = [];

    /** @type {Number} */
    iOrdinal;

    /** @type {String} */
    sName;

    /**
     *
     * @param {String} _sName
     */
    constructor(_sName) {
        super();

        this.sName = _sName;
        this.iOrdinal = AbstractEnum.arrValues.push(this);
    }

    /**
     * @template {AbstractEnum<TYPE>} TYPE
     * @returns {TYPE[]}
     */
    static values() {
        return this.arrValues;
    }
}
