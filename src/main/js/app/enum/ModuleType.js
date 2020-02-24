import { AbstractEnum } from "./AbstractEnum";

/**
 * @extends {AbstractEnum<ModuleType>}
 */
export class ModuleType extends AbstractEnum {

    static LAYOUT = new ModuleType("WINDOW");
    static HEADER = new ModuleType("HEADER");
    static MENU = new ModuleType("MENU");
    static CONTENT = new ModuleType("CONTENT");

}
