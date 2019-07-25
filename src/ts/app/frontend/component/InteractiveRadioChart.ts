import { AbstractComponent } from "./AbstractComponent";
import { AbstractComponentRenderer } from './AbstractComponentRenderer';

export class InteractiveRadioChart extends AbstractComponent<InteractiveRadioChartRenderer>  {

    constructor() {
        super();
    }

    public setWidth(iWidth: number): void {
        this.getRenderer().setWidth(iWidth);
    }

    public setHeight(iHeight: number): void {
        this.getRenderer().setHeight(iHeight);
    }

    public setRadius(iRadius: number): void {
        this.getRenderer().setRadius(iRadius);
    }

    setDataModel(_oData: Object) {
        this.getRenderer().setDataModel(_oData);
    }

    public setScaleLineWidth(iWidth: number): void {
        this.getRenderer().setScaleLineWidth(iWidth);
    }

    public setScaleLineStyle(sStyle: string): void;
    public setScaleLineStyle(oStyle: CanvasGradient): void;
    public setScaleLineStyle(oStyle: CanvasPattern): void;
    public setScaleLineStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setScaleLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setScaleLineStyle(oStyle);
    }

    public setAreaLineWidth(iWidth: number): void {
        this.getRenderer().setAreaLineWidth(iWidth);
    }

    public setAreaLineStyle(sStyle: string): void;
    public setAreaLineStyle(oStyle: CanvasGradient): void;
    public setAreaLineStyle(oStyle: CanvasPattern): void;
    public setAreaLineStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setAreaLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setAreaLineStyle(oStyle);
    }

    public setAreaFillStyle(sStyle: string): void;
    public setAreaFillStyle(oStyle: CanvasGradient): void;
    public setAreaFillStyle(oStyle: CanvasPattern): void;
    public setAreaFillStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setAreaFillStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setAreaFillStyle(oStyle);
    }

    public setHandleRadius(iRadius: number): void {
        this.getRenderer().setHandleRadius(iRadius);
    }

    public setHandleLineWidth(iWidth: number): void {
        this.getRenderer().setHandleLineWidth(iWidth);
    }

    public setHandleLineStyle(sStyle: string): void;
    public setHandleLineStyle(oStyle: CanvasGradient): void;
    public setHandleLineStyle(oStyle: CanvasPattern): void;
    public setHandleLineStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setHandleLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setHandleLineStyle(oStyle);
    }

    public setHandleFillStyle(sStyle: string): void;
    public setHandleFillStyle(oStyle: CanvasGradient): void;
    public setHandleFillStyle(oStyle: CanvasPattern): void;
    public setHandleFillStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setHandleFillStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setHandleFillStyle(oStyle);
    }

    public setLabelFontStyle(sStyle: string): void;
    public setLabelFontStyle(oStyle: CanvasGradient): void;
    public setLabelFontStyle(oStyle: CanvasPattern): void;
    public setLabelFontStyle(fCallback: (oCtx: CanvasRenderingContext2D, iCenterX: number, iCenterY: number, iRadius: number) => string | CanvasGradient | CanvasPattern): void;
    public setLabelFontStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.getRenderer().setLabelFontStyle(oStyle);
    }

    public setLabelFont(sFont: string): void {
        this.getRenderer().setLabelFont(sFont);
    }

    public setLabelAlign(sFont: CanvasTextAlign): void {
        this.getRenderer().setLabelAlign(sFont);
    }

    protected createRenderer(): InteractiveRadioChartRenderer {
        return new InteractiveRadioChartRenderer();
    }

}

class InteractiveRadioChartRenderer extends AbstractComponentRenderer {

    // config
    private manualWidth: null | number = null;
    private manualHeight: null | number = null;
    private manualCenterX: number | null = null;
    private manualCenterY: number | null = null;
    private manualRadius: number | null = null;
    private arrScales: RadioScale[] = new Array();

    private scaleLineWidth: number = 1;
    private scaleLineStyle: string | CanvasGradient | CanvasPattern | Function = "rgb(255,200,0)";
    private areaLineWidth: number = 3;
    private areaLineStyle: string | CanvasGradient | CanvasPattern | Function = "rgba(255,255,255,0.3)";
    private areaFillStyle: string | CanvasGradient | CanvasPattern | Function = "rgba(255,255,255,0.7)";
    private handleRadius: number = 10;
    private handleLineWidth: number = 3;
    private handleFillStyle: string | CanvasGradient | CanvasPattern | Function = "rgba(255,255,255,0.7)";
    private handleLineStyle: string | CanvasGradient | CanvasPattern | Function = "rgba(255,255,255,0.3)";
    private labelFontStyle: string | CanvasGradient | CanvasPattern | Function = "rgba(255,255,255,1)";
    private labelFont: string = "12pt Arial,sans-serif";
    private labelAlign: CanvasTextAlign = "center";


    // objects
    private oData: Object | null = null;
    private oCanvas: HTMLCanvasElement;
    private oCtx: CanvasRenderingContext2D;

    // calculated
    private arrHandles: RadioHandle[] = new Array();
    private movingHandle: RadioHandle | null | number = null;
    private bIsDragged: boolean = false;
    private iCenterX!: number;
    private iCenterY!: number;
    private iRadius!: number;
    private step!: number;
    private perks: number = 1;
    private startX: number = 0;
    private startY: number = 0;
    dataset: any;
    dataLabel: any;
    data: any;

    constructor() {
        super();

        // canvas
        this.oCanvas = document.createElement("canvas");
        this.oCanvas.addEventListener("resize", (...data) => { this.recalc.apply(this, data); });
        this.oCanvas.addEventListener("mousedown", (...data) => { this.onMouseDown.apply(this, data); });
        this.oCanvas.addEventListener("touchstart", (...data) => { this.onΤouchStart.apply(this, data); });
        this.oCanvas.addEventListener("mousemove", (...data) => { this.onMouseMove.apply(this, data); });
        this.oCanvas.addEventListener("touchmove", (...data) => { this.onTouchMove.apply(this, data); });
        document.addEventListener("mouseup", (...data) => { this.onMouseUp.apply(this, data); });
        document.addEventListener("touchend", (...data) => { this.onTouchEnd.apply(this, data); });

        // context
        this.oCtx = this.oCanvas.getContext('2d')!;
        if (this.oCtx === null) {
            throw new Error("2d context null");
        }
        this.oCtx.lineCap = 'round';
    }

    public render(): HTMLElement {
        return this.oCanvas;
    }

    private recalc(event: UIEvent | null): void {
        // recalc
        this.step = 360 / this.arrScales.length;
        this.iCenterX = this.manualCenterX || Math.floor(this.oCanvas.width / 2);
        this.iCenterY = this.manualCenterY || Math.floor(this.oCanvas.height / 2);
        this.iRadius = this.manualRadius || Math.floor(this.oCanvas.width / 2) - 50;
        this.redraw();
    }


    private onMouseDown(event: MouseEvent) {
        this.startDragging(event.clientX, event.layerX);
    }

    private onΤouchStart(event: TouchEvent) {
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

    private onMouseMove(event: MouseEvent) {
        this.moveDraggable(event.clientX, event.clientY);
    }

    private onTouchMove(event: TouchEvent) {
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

    private onMouseUp(event: MouseEvent) {
        this.stopDragging(event.clientX, event.clientY);
    }

    private onTouchEnd(event: TouchEvent) {
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

    private startDragging(x: number, y: number) {
        this.bIsDragged = true;
        this.movingHandle = this.getClosestHandle(x, y);
    }

    private moveDraggable(x: number, y: number) {

    }

    private stopDragging(x: number, y: number) {

    }

    private canelDragging() {

    }

    private isDragging(): boolean {
        return this.bIsDragged;
    }

    private redraw(): void {
        this.drawBackground();
        this.drawArea();
        this.drawHandles();
        this.drawLabel();
    }

    //draw Radar
    private drawBackground(): void {
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

    private drawArea(): void {
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

    private drawHandles(): void {
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

    private drawLabel(): void {
        this.oCtx.fillStyle = this.ensureValue(this.labelFontStyle);
        this.oCtx.font = this.labelFont;
        this.oCtx.textAlign = this.labelAlign;
        for (let i = 0; i < this.dataset.length; i++) {
            let pos = this.lineToAngle(this.iCenterX, this.iCenterY, this.iRadius + 20, i * this.step - 90);
            this.oCtx.fillText(this.dataLabel[i], pos.x, pos.y, 200);
        }
    }

    private lineToAngle(x: number, y: number, length: number, angle: number): RadioHandle {
        this.oCtx.moveTo(x, y);
        let target = this.pointToAngle(x, y, length, angle);
        this.oCtx.lineTo(target.x, target.y);
        return target;
    }

    private pointToAngle(x1: number, y1: number, dist: number, angle: number): RadioHandle {
        angle *= Math.PI / 180;
        let x2 = x1 + dist * Math.cos(angle),
            y2 = y1 + dist * Math.sin(angle);
        return new RadioHandle(x2, y2);
    }

    private getDistance(pos: { x: any; y: any; }): number {
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

    private getClosestHandle(_x: number, _y: number): number {
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

    private moveHandle(_handle: string | number): void {
        if (this.bIsDragged) {
            let handle: string | number = this.getClosestHandle(this.startY, this.startY);
            let dist = this.getDistance({ x: this.startX, y: this.startY });
            let maxValue = this.checkMaxValue(handle);
            let minValue = this.data[handle];

            let value = Math.max(Math.min(dist / this.iRadius, maxValue), minValue);

            this.dataset[handle] = value;
        }
    }

    private checkMaxValue(handle: number): number {
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

    private ensureValue(oValue: string | CanvasGradient | CanvasPattern | Function): string | CanvasGradient | CanvasPattern {
        return (oValue instanceof Function)
            ? oValue.apply(this, [this.oCtx, this.iCenterX, this.iCenterY, this.iRadius])
            : oValue;
    }

    public setWidth(iWidth: number): void {
        this.manualWidth = iWidth;
    }

    public setHeight(iHeight: number): void {
        this.manualHeight = iHeight;
    }

    public setRadius(iRadius: number): void {
        this.manualRadius = iRadius;
    }

    public getDataModel(): Object | null {
        return this.oData;
    }

    public setDataModel(_oData: Object): void {
        this.oData = _oData;
    }

    public addScale(_oScale: RadioScale): void {

    }

    public setScaleLineWidth(iWidth: number): void {
        this.scaleLineWidth = iWidth;
    }

    public setScaleLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.scaleLineStyle = oStyle;
    }

    public setAreaLineWidth(iWidth: number): void {
        this.areaLineWidth = iWidth;
    }

    public setAreaLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.areaLineStyle = oStyle;
    }

    public setAreaFillStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.areaFillStyle = oStyle;
    }

    public setHandleRadius(iRadius: number): void {
        this.handleRadius = iRadius;
    }

    public setHandleLineWidth(iWidth: number): void {
        this.handleLineWidth = iWidth;
    }

    public setHandleLineStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.handleLineStyle = oStyle;
    }

    public setHandleFillStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.handleFillStyle = oStyle;
    }

    public setLabelFontStyle(oStyle: string | CanvasGradient | CanvasPattern | Function): void {
        this.labelFontStyle = oStyle;
    }

    public setLabelFont(sFont: string): void {
        this.labelFont = sFont;
    }

    public setLabelAlign(sAlign: CanvasTextAlign): void {
        this.labelAlign = sAlign;
    }

}

export class RadioScale {

    private readonly sKey: string;
    private label: string;
    private mapPercentageLabel: Map<number, string> = new Map();

    constructor(_sKey: string, _sLabel: string) {
        this.sKey = _sKey;
        this.label = _sLabel;
    }

    public getKey(): string {
        return this.sKey;
    }

    public addPercentageLabel(_iPercentage: number, _sLabel: string): void {
        if (typeof (_iPercentage) !== "number" || _iPercentage < 0 || _iPercentage > 100) {
            throw new TypeError("percentage must betweeen 0 and 100!");
        }
        if (typeof (_sLabel) !== "string" || _sLabel == "") {
            throw new TypeError("label must be given!");
        }
        this.getPercentageLabelMap().set(_iPercentage, _sLabel);
    }

    public getPercentageLabelMap(): Map<number, string> {
        if (!(this.mapPercentageLabel instanceof Map)) {
            this.mapPercentageLabel = new Map();
        }
        return this.mapPercentageLabel;
    }

    public setPercentageLabelMap(value: Map<number, string>) {
        this.mapPercentageLabel = value;
    }

    public getLabel(): string {
        return this.label;
    }

    public setLabel(value: string): void {
        this.label = value;
    }

}

class RadioHandle {

    x: number;
    y: number;

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    getX(): number {
        return this.x;
    }

    setX(_x: number): void {
        this.x = _x;
    }

    getY(): number {
        return this.x;
    }

    setY(_y: number): void {
        this.y = _y;
    }

}
