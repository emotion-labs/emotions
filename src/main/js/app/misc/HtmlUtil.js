import { AbstractObject } from "./AbstractObject";
import { TypeUtil } from "./TypeUtil";

export class HtmlUtil extends AbstractObject {

    /**
     *
     * @static
     * @param {String} _sName
     * @param {Function} _cClass
     * @param {ElementDefinitionOptions} _oOptions
     * @memberof HtmlUtils
     */
    static checkRegistration(_sName, _cClass, _oOptions) {
        TypeUtil.validateTypeString(_sName, "_sName");
        let sName = _sName.toLowerCase();
        let oRet = window.customElements.get(sName);
        if (oRet === undefined || oRet === null) {
            window.customElements.define(sName, _cClass, _oOptions);
        }
    }


}
