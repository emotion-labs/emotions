class Util {

    static camelToDelimited(_sName: string, _sDelimiter: string) {
        return _sName.replace(/\W+/g, _sDelimiter)
            .replace(/([a-z\d])([A-Z])/g, '$1' + _sDelimiter + '$2');
    }

    static empty(_obj: any) {
        switch (true) {
            case (_obj === undefined):
                return true;

            case (_obj === null):
                return true;

            case (_obj === false):
                return true;

            default:
                switch (typeof (_obj)) {
                    case "string":
                        return (_obj.trim().length == 0);
                    case "object":
                        if (Array.isArray(_obj)) {
                            return _obj.length == 0;
                        } else {
                            return Object.entries(_obj).length == 0;
                        }
                }
        }
        return false;
    }

    static notEmpty(_obj: any) {
        return !Util.empty(_obj);
    }

    static stringEmpty(_obj: any) {
        return typeof (_obj) === "string" && Util.empty(_obj);
    }

    static stringNotEmpty(_obj: any) {
        return typeof (_obj) === "string" && !Util.empty(_obj);
    }

    static parseUrl(_sUrl: string) {
        if (Util.empty(_sUrl) || typeof (_sUrl) !== "string") {
            return false;
        }
        var match = _sUrl.match(/^(?:(https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*?(([^/?#\.]+)?(?:\.([^/?#]+))?)?)(\?[^#]*|)(#.*|)$/);
        return match && {
            href: _sUrl,
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            file: match[6],
            filename: match[7],
            extension: match[8],
            search: match[9],
            hash: match[10]
        } || false;
    }
}