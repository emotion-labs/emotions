
export abstract class AbstractEventListener {
    private static readonly CONSOLE_STYLE_EVENTS: String = "color: #ff00ff;";
    private mapEvents: Map<Object, Map<Symbol, Function>> = new Map();

    constructor() {

    }

    protected registerEvent(_name: Object) {
        if (this.mapEvents.has(_name)) {
            throw new Error(`event '${name}' already registered`);
        }
        this.mapEvents.set(_name, new Map());
    }

    protected triggerEvent(_name: Object, ..._data: any[]) {
        let mapEventListener = this.getEventListenerMap(_name);
        console.debug("%c trigger Event ", AbstractEventListener.CONSOLE_STYLE_EVENTS, _name, _data);
        for (const [key, listener] of mapEventListener) {
            try {
                listener.apply(this, _data);
            } catch (e) {
                console.error("%c trigger event error", e, _name, listener);
            }
        }
    }

    addEventListener(_name: Object, _listener: Function): Symbol {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = Symbol.for(_listener.toString());
        if (!mapEventListener!.has(key)) {
            mapEventListener!.set(key, _listener);
        }
        return key;
    }

    removeEventListenr(_name: Object, _listener: Function | Symbol) {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = _listener instanceof Symbol ? _listener : Symbol.for(_listener.toString());
        if (mapEventListener!.has(key)) {
            return mapEventListener!.delete(key);
        }
        return false;
    }

    hasEventListener(_name: Object, _listener: Function | Symbol) {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = _listener instanceof Symbol ? _listener : Symbol.for(_listener.toString());
        return mapEventListener.has(key);
    }

    private getEventListenerMap(_name: Object): Map<Symbol, Function> {
        if (!this.mapEvents.has(_name)) {
            throw new Error(`unregistered event '${name}'`);
        }
        return this.mapEvents.get(_name)!;
    }

}
