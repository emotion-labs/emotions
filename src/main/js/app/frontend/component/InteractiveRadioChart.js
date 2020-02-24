import { AbstractComponent } from "../AbstractComponent";
import { HtmlUtil } from "../../misc/HtmlUtil";


/**
 * @extends {AbstractComponent<InteractiveRadioChartView>}
 */
export class InteractiveRadioChart extends AbstractComponent {

    constructor() {
        super();
    }

    createView() {
        return new InteractiveRadioChartView();
    }

}

class InteractiveRadioChartView extends HTMLCanvasElement {

    // config
    /** @type {null | number} */ manualWidth;
    /** @type {null | number} */ manualHeight;
    /** @type {null | number} */ manualCenterX;
    /** @type {null | number} */ manualCenterY;
    /** @type {null | number} */ manualRadius;
    /** @type {RadioScale[]} */ arrScales;

    /** @type {number} */ scaleLineWidth;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ scaleLineStyle;
    /** @type {number} */ areaLineWidth;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ areaLineStyle;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ areaFillStyle;
     /** @type {number} */ handleRadius;
     /** @type {number} */ handleLineWidth;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ handleFillStyle;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ handleLineStyle;
    /** @type {string | CanvasGradient | CanvasPattern | Function} */ labelFontStyle;
    /** @type {string} */ labelFont;
    /** @type {CanvasTextAlign} */ labelAlign;


    // objects
    /** @type {Object | null} */ oData;
    /** @type {CanvasRenderingContext2D} */ oCtx;

    // calculated
    /** @type {RadioHandle[]} */ arrHandles;
    /** @type {RadioHandle | null | number} */ movingHandle;
    /** @type {boolean} */ bIsDragged;
    /** @type {number} */ iCenterX;
    /** @type {number} */ iCenterY;
    /** @type {number} */ iRadius;
    /** @type {number} */ step;
    /** @type {number} */ perks;
    /** @type {number} */ startX;
    /** @type {number} */ startY;
    dataset;
    dataLabel;
    data;

    constructor() {
        HtmlUtil.checkRegistration(InteractiveRadioChart.getClassFullExternalName(), InteractiveRadioChartView, { extends: 'canvas' });
        super();
        this.initVars();

        // canvas
        this.addEventListener("resize", (...data) => { this.reCalc.apply(this, data); });
        this.addEventListener("mousedown", (...data) => { this.onMouseDown.apply(this, data); });
        this.addEventListener("touchstart", (...data) => { this.onTouchStart.apply(this, data); });
        this.addEventListener("mousemove", (...data) => { this.onMouseMove.apply(this, data); });
        this.addEventListener("touchmove", (...data) => { this.onTouchMove.apply(this, data); });
        document.addEventListener("mouseup", (...data) => { this.onMouseUp.apply(this, data); });
        document.addEventListener("touchend", (...data) => { this.onTouchEnd.apply(this, data); });

        // context
        this.oCtx = this.getContext('2d');
        if (this.oCtx === null) {
            throw new Error("2d context null");
        }
        this.oCtx.lineCap = 'round';
    }

    initVars() {

        // config
        this.manualWidth = null;
        this.manualHeight = null;
        this.manualCenterX = null;
        this.manualCenterY = null;
        this.manualRadius = null;
        this.arrScales = new Array();

        this.scaleLineWidth = 1;
        this.scaleLineStyle = "rgb(255,200,0)";
        this.areaLineWidth = 3;
        this.areaLineStyle = "rgba(255,255,255,0.3)";
        this.areaFillStyle = "rgba(255,255,255,0.7)";
        this.handleRadius = 10;
        this.handleLineWidth = 3;
        this.handleFillStyle = "rgba(255,255,255,0.7)";
        this.handleLineStyle = "rgba(255,255,255,0.3)";
        this.labelFontStyle = "rgba(255,255,255,1)";
        this.labelFont = "12pt Arial,sans-serif";
        this.labelAlign = "center";

        // objects
        this.oData = null;

        // calculated
        this.arrHandles = new Array();
        this.movingHandle = null;
        this.bIsDragged = false;
        this.perks = 1;
        this.startX = 0;
        this.startY = 0;
    }

    /**
     *
     * @param {UIEvent | null} event
     */
    reCalc(event) {
        // recalc
        this.step = 360 / this.arrScales.length;
        this.iCenterX = this.manualCenterX || Math.floor(this.width / 2);
        this.iCenterY = this.manualCenterY || Math.floor(this.height / 2);
        this.iRadius = this.manualRadius || Math.floor(this.width / 2) - 50;
        this.redraw();
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseDown(event) {
        this.startDragging(event.clientX, event.clientY);
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchStart(event) {
        if (event.touches.length === 1) {
            let oTouch = event.touches.item(0);
            if (oTouch !== null) {
                this.startDragging(oTouch.clientX, oTouch.clientY);
            } else if (this.isDragging()) {
                this.canelDragging();
            }
        } else if (this.isDragging()) {
            this.canelDragging();
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseMove(event) {
        this.moveDraggable(event.clientX, event.clientY);
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchMove(event) {
        if (event.touches.length === 1) {
            let oTouch = event.touches.item(0);
            if (oTouch !== null) {
                this.startDragging(oTouch.clientX, oTouch.clientY);
            } else if (this.isDragging()) {
                this.canelDragging();
            }
        } else if (this.isDragging()) {
            this.canelDragging();
        }
    }

    /**
     *
     * @param {MouseEvent} event
     */
    onMouseUp(event) {
        this.stopDragging(event.clientX, event.clientY);
    }

    /**
     *
     * @param {TouchEvent} event
     */
    onTouchEnd(event) {
        if (event.touches.length === 0) {
            this.stopDragging
        } else if (event.touches.length === 1) {
            let oTouch = event.touches.item(0);
            if (oTouch !== null) {
                this.startDragging(oTouch.clientX, oTouch.clientY);
            } else if (this.isDragging()) {
                this.canelDragging();
            }
        } else if (this.isDragging()) {
            this.canelDragging();
        }
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    startDragging(x, y) {
        this.bIsDragged = true;
        this.movingHandle = this.getClosestHandle(x, y);
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    moveDraggable(x, y) {

    }

    /**
     *
     * @param {number} x
     * @param {number} y
     */
    stopDragging(x, y) {

    }

    canelDragging() {

    }

    isDragging() {
        return this.bIsDragged;
    }

    redraw() {
        this.drawBackground();
        this.drawArea();
        this.drawHandles();
        this.drawLabel();
    }

    //draw Radar
    drawBackground() {
        this.oCtx.beginPath();
        for (let i = 0; i < this.dataset.length; i++) {
            this.oCtx.lineWidth = this.scaleLineWidth;
            this.oCtx.strokeStyle = this.ensureValue(this.scaleLineStyle);
            this.lineToAngle(this.iCenterX, this.iCenterY, this.iRadius, i * this.step - 90);
            this.oCtx.stroke();
        }
        this.oCtx.closePath();
        this.oCtx.stroke();
    }

    drawArea() {
        this.oCtx.beginPath();
        for (let i = 0; i < this.dataset.length; i++) {
            let pos = this.pointToAngle(this.iCenterX, this.iCenterY, this.iRadius * this.dataset[i], i * this.step - 90);
            this.arrHandles.splice(i, 1, pos);
            if (i == 0) {
                this.oCtx.moveTo(pos.x, pos.y);
            } else {
                this.oCtx.lineTo(pos.x, pos.y);
            }
        }
        this.oCtx.closePath();
        this.oCtx.strokeStyle = this.ensureValue(this.areaLineStyle);
        this.oCtx.fillStyle = this.ensureValue(this.areaFillStyle);
        this.oCtx.lineWidth = this.areaLineWidth;
        this.oCtx.fill();
        this.oCtx.stroke();
    }

    drawHandles() {
        this.oCtx.strokeStyle = this.ensureValue(this.handleLineStyle);
        this.oCtx.fillStyle = this.ensureValue(this.handleFillStyle);
        this.oCtx.lineWidth = this.handleLineWidth;
        for (let i = 0; i < this.dataset.length; i++) {
            this.oCtx.beginPath();
            this.oCtx.arc(this.arrHandles[i].x, this.arrHandles[i].y, this.handleRadius, 0, 2 * Math.PI, true);
            this.oCtx.fill();
            this.oCtx.stroke();
        }
    }

    drawLabel() {
        this.oCtx.fillStyle = this.ensureValue(this.labelFontStyle);
        this.oCtx.font = this.labelFont;
        this.oCtx.textAlign = this.labelAlign;
        for (let i = 0; i < this.dataset.length; i++) {
            let pos = this.lineToAngle(this.iCenterX, this.iCenterY, this.iRadius + 20, i * this.step - 90);
            this.oCtx.fillText(this.dataLabel[i], pos.x, pos.y, 200);
        }
    }

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {number} length
     * @param {number} angle
     */
    lineToAngle(x, y, length, angle) {
        this.oCtx.moveTo(x, y);
        let target = this.pointToAngle(x, y, length, angle);
        this.oCtx.lineTo(target.x, target.y);
        return target;
    }

    /**
     *
     * @param {number} x1
     * @param {number} y1
     * @param {number} dist
     * @param {number} angle
     */
    pointToAngle(x1, y1, dist, angle) {
        angle *= Math.PI / 180;
        let x2 = x1 + dist * Math.cos(angle),
            y2 = y1 + dist * Math.sin(angle);
        return new RadioHandle(x2, y2);
    }


    /**
     * @typedef {Object} Position
     * @property {number} x
     * @property {number} y
     */
    /**
     *
     * @param {Position} pos
     */
    getDistance(pos) {
        //get the distance
        let xs = 0;
        let ys = 0;
        xs = pos.x - this.iCenterX;
        xs = xs * xs;
        ys = pos.y - this.iCenterY;
        ys = ys * ys;
        //return distance
        return Math.sqrt(xs + ys);
    }

    /**
     *
     * @param {number} _x
     * @param {number} _y
     */
    getClosestHandle(_x, _y) {
        let previousDist = Number.MAX_VALUE;
        let handle = 0;
        for (let i = 0; i < this.arrHandles.length; i++) {
            let dx = this.startX - this.arrHandles[i].x;
            let dy = this.startY - this.arrHandles[i].y;
            let dist = Math.sqrt((dx * dx) + (dy * dy));
            if (dist < previousDist) {
                previousDist = dist;
                handle = i;
            }
        }
        return handle;
    }

    /**
     *
     * @param {string | number} _handle
     */
    moveHandle(_handle) {
        if (this.bIsDragged) {
            /** @type {string | number} */ let handle = this.getClosestHandle(this.startY, this.startY);
            let dist = this.getDistance({ x: this.startX, y: this.startY });
            let maxValue = this.checkMaxValue(handle);
            let minValue = this.data[handle];
            let value = Math.max(Math.min(dist / this.iRadius, maxValue), minValue);
            this.dataset[handle] = value;
        }
    }

    /**
     *
     * @param {string | number} handle
     */
    checkMaxValue(handle) {
        let axisValue = 1 / this.dataset.length;
        let sum = 0;
        for (let i = 0; i < this.dataset.length; i++) {
            if (i != handle) {
                let value = this.dataset[i] * axisValue;
                sum = sum + value
            }
        }
        let maxValue = (this.perks - sum) / axisValue
        return Math.min(maxValue, 1);
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function | CanvasGradient | CanvasPattern} oValue
     */
    ensureValue(oValue) {
        return (oValue instanceof Function)
            ? oValue.apply(this, [this.oCtx, this.iCenterX, this.iCenterY, this.iRadius])
            : oValue;
    }

    /**
     *
     * @param {number} iWidth
     */
    setWidth(iWidth) {
        this.manualWidth = iWidth;
    }

    /**
     *
     * @param {number} iHeight
     */
    setHeight(iHeight) {
        this.manualHeight = iHeight;
    }

    /**
     *
     * @param {number} iRadius
     */
    setRadius(iRadius) {
        this.manualRadius = iRadius;
    }

    getDataModel() {
        return this.oData;
    }

    /**
     *
     * @param {*} _oData
     */
    setDataModel(_oData) {
        this.oData = _oData;
    }

    /**
     *
     * @param {RadioScale} _oScale
     */
    addScale(_oScale) {

    }

    /**
     *
     * @param {number} iWidth
     */
    setScaleLineWidth(iWidth) {
        this.scaleLineWidth = iWidth;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setScaleLineStyle(oStyle) {
        this.scaleLineStyle = oStyle;
    }

    /**
     *
     * @param {number} iWidth
     */
    setAreaLineWidth(iWidth) {
        this.areaLineWidth = iWidth;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setAreaLineStyle(oStyle) {
        this.areaLineStyle = oStyle;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setAreaFillStyle(oStyle) {
        this.areaFillStyle = oStyle;
    }

    /**
     *
     * @param {number} iRadius
     */
    setHandleRadius(iRadius) {
        this.handleRadius = iRadius;
    }

    /**
     *
     * @param {number} iWidth
     */
    setHandleLineWidth(iWidth) {
        this.handleLineWidth = iWidth;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setHandleLineStyle(oStyle) {
        this.handleLineStyle = oStyle;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setHandleFillStyle(oStyle) {
        this.handleFillStyle = oStyle;
    }

    /**
     *
     * @param {string | CanvasGradient | CanvasPattern | Function} oStyle
     */
    setLabelFontStyle(oStyle) {
        this.labelFontStyle = oStyle;
    }

    /**
     *
     * @param {string} sFont
     */
    setLabelFont(sFont) {
        this.labelFont = sFont;
    }

    /**
     *
     * @param {CanvasTextAlign} sAlign
     */
    setLabelAlign(sAlign) {
        this.labelAlign = sAlign;
    }

}

export class RadioScale {

    /** @type {string} */ sKey;
    /** @type {string} */ label;
    /** @type {Map<number, string>} */ mapPercentageLabel = new Map();

    /**
     *
     * @param {string} _sKey
     * @param {string} _sLabel
     */
    constructor(_sKey, _sLabel) {
        this.sKey = _sKey;
        this.label = _sLabel;
    }

    getKey() {
        return this.sKey;
    }

    /**
     *
     * @param {number} _iPercentage
     * @param {string} _sLabel
     */
    addPercentageLabel(_iPercentage, _sLabel) {
        if (typeof (_iPercentage) !== "number" || _iPercentage < 0 || _iPercentage > 100) {
            throw new TypeError("percentage must betweeen 0 and 100!");
        }
        if (typeof (_sLabel) !== "string" || _sLabel == "") {
            throw new TypeError("label must be given!");
        }
        this.getPercentageLabelMap().set(_iPercentage, _sLabel);
    }

    getPercentageLabelMap() {
        if (!(this.mapPercentageLabel instanceof Map)) {
            this.mapPercentageLabel = new Map();
        }
        return this.mapPercentageLabel;
    }

    /**
     *
     * @param {Map<number, string>} value
     */
    setPercentageLabelMap(value) {
        this.mapPercentageLabel = value;
    }

    getLabel() {
        return this.label;
    }

    /**
     *
     * @param {string} value
     */
    setLabel(value) {
        this.label = value;
    }

}

class RadioHandle {

    /** @type {number} */ x;
    /** @type {number} */ y;

    /**
     *
     * @param {number} _x
     * @param {number} _y
     */
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }

    getX() {
        return this.x;
    }

    /**
     *
     * @param {number} _x
     */
    setX(_x) {
        this.x = _x;
    }

    getY() {
        return this.x;
    }

    /**
     *
     * @param {number} _y
     */
    setY(_y) {
        this.y = _y;
    }

}
