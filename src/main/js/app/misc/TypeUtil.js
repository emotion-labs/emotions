import { AbstractObject } from "./AbstractObject";

export class TypeUtil extends AbstractObject {

    static TYPE_STRING = "string";

    /**
     *
     * @param {String} _sData
     * @param {String} _sName
     */
    static validateTypeString(_sData, _sName) {
        if (typeof (_sName) !== this.TYPE_STRING) {
            throw new TypeError((this.name + ".validateType Parameter _sName must be a String!").trim());
        }
        if (typeof (_sData) !== this.TYPE_STRING) {
            throw new TypeError((_sName + " must be a String!").trim());
        }
    }

}
