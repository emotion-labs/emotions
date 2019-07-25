export abstract class AbstractEventListener {
    private static readonly CONSOLE_STYLE_EVENTS: String = "color: #ff00ff;";
    private mapEventListener: Map<Object, Map<Symbol, Function>> = new Map();
    private mapEvents: Map<Object, any[]> = new Map();

    constructor() {

    }

    protected registerEvent(_name: Object) {
        if (this.mapEventListener.has(_name)) {
            throw new Error(`event '${name}' already registered`);
        }
        this.mapEventListener.set(_name, new Map());
        this.mapEvents.set(_name, []);
    }

    protected triggerEvent(_name: Object, ..._data: any[]) {
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

    addEventListener(_name: Object, _listener: Function, _iLastMessages: Number = 0): Symbol {
        let mapEventListener = this.getEventListenerMap(_name);
        let key = Symbol.for(_listener.toString());
        if (!mapEventListener!.has(key)) {
            mapEventListener!.set(key, _listener);
            let arrEvents = this.getEventList(_name);
            while (arrEvents.length > 0) {
                this.triggerListener(_listener, arrEvents.shift(), _name);
            }
        }
        return key;
    }

    removeEventListener(_name: Object, _listener: Function | Symbol) {
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

    private triggerListener(listener: Function, _data: any[], _name: Object) {
        try {
            listener.apply(this, _data);
        }
        catch (e) {
            console.error("%c trigger event error", e, _name, listener);
        }
    }

    private getEventList(_name: Object): any[] {
        if (!this.mapEvents.has(_name)) {
            throw new Error(`unregistered event '${name}'`);
        }
        return this.mapEvents.get(_name)!;
    }

    private getEventListenerMap(_name: Object): Map<Symbol, Function> {
        if (!this.mapEventListener.has(_name)) {
            throw new Error(`unregistered event '${name}'`);
        }
        return this.mapEventListener.get(_name)!;
    }

}
