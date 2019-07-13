export abstract class AbstractEnum<T> extends Object {

    protected static arrValues: AbstractEnum<any>[] = [];

    protected iOrdinal: Number;
    protected sName: String;

    protected constructor(_sName: String) {
        super();

        this.sName = _sName;
        this.iOrdinal = AbstractEnum.arrValues.push(this);
    }

    public static values<T>(): AbstractEnum<T>[] {
        return this.arrValues;
    }


}
