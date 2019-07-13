import { AbstractEnum } from "./AbstractEnum";

export class ModuleType extends AbstractEnum<ModuleType> {

    public static readonly HEADER = new ModuleType("HEADER");
    public static readonly MENU = new ModuleType("MENU");
    public static readonly CONTENT = new ModuleType("CONTENT");

}
