import { Application } from "./app/Application";

/** CONSTANTS - START */
const CONSOLE_STYLE_APPLICATION = "color: blue;";
const CONSOLE_STYLE_ΕRRΟR = "color: red;";
/** CONSTANTS - END */

const app = new Application();
console.info("%c construct Application", CONSOLE_STYLE_APPLICATION, app);
app.run();
