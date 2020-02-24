import { AbstractObject } from "./AbstractObject";



/**
 * @typedef  {() => void} EventListener
 *
 */
/**
 *
 *
 * @export
 * @class AbstractEventListener
 * @extends {AbstractObject}
 */
export class AbstractEventListener extends AbstractObject {

    static CONSOLE_STYLE_EVENTS = "color: #ff00ff;";

    /** @type {Map<*, Map<Symbol, Function>>} */
    mapEventListener = new Map();

    /** @type {Map<Symbol, any[]>} */
    mapEvents = new Map();

    constructor() {
        super();
    }

    registerEvent(_name) {
        if (this.mapEventListener.has(_name)) {
            throw new Error(`event '${name}' already registered`);
        }
        this.mapEventListener.set(_name, new Map());
        this.mapEvents.set(_name, []);
    }

    triggerEvent(_name, ..._data) {
        let mapEventListener = this.getEventListenerMap(_name);
        console.debug("%c trigger Event ", AbstractEventListener.CONSOLE_STYLE_EVENTS, _name, _data);
        if (mapEventListener.size > 0) {
            for (const [key, listener] of mapEventListener) {
                this.triggerListener(listener, _data, _name);
            }
        } else {
            this.getEventList(_name).push(_name);
        }
    }

    /**
     *
     * @param {*} _name
     * @param {EventListener} _listener
     * @param {Number} _iLastMessages
     */
    addEventListener(_name, _listener, _iLastMessages) {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = Symbol.for(_listener.toString());
        if (!mapEventListener.has(key)) {
            mapEventListener.set(key, _listener);
            let arrEvents = this.getEventList(_name);
            while (arrEvents.length > 0) {
                this.triggerListener(_listener, arrEvents.shift(), _name);
            }
        }
        return key;
    }

    /**
     *
     * @param {*} _name
     * @param {EventListener | Symbol} _fListener
     */
    removeEventListener(_name, _fListener) {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = _fListener instanceof Symbol ? _fListener : Symbol.for(_fListener.toString());
        if (mapEventListener.has(key)) {
            return mapEventListener.delete(key);
        }
        return false;
    }

    /**
     *
     * @param {*} _name
     * @param {Function | Symbol} _listener
     */
    hasEventListener(_name, _listener) {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = _listener instanceof Symbol ? _listener : Symbol.for(_listener.toString());
        return mapEventListener.has(key);
    }

    /**
     *
     * @param {Function} listener
     * @param {*[]} _data
     * @param {*} _name
     */
    triggerListener(listener, _data, _name) {
        try {
            listener.apply(this, _data);
        }
        catch (e) {
            console.error("%c trigger event error", e, _name, listener);
        }
    }

    /**
     *
     * @param {*} _name
     */
    getEventList(_name) {
        if (!this.mapEvents.has(_name)) {
            throw new Error(`unregistered event '${name}'`);
        }
        return this.mapEvents.get(_name);
    }

    /**
     *
     * @param {Symbol | Function} _name
     */
    getEventListenerMap(_name) {
        if (!this.mapEventListener.has(_name)) {
            throw new Error(`unregistered event '${name}'`);
        }
        return this.mapEventListener.get(_name);
    }

}
