import { EmotionApplication } from "./app/EmotionApplication";

/** CONSTANTS - START */
const CONSOLE_STYLE_APPLICATION = "color: blue;";
/** CONSTANTS - END */

const app = EmotionApplication.instance();
console.info("%c construct Application", CONSOLE_STYLE_APPLICATION, app);
app.run();
