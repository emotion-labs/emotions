// @ts-ignore
import * as am4core from "@amcharts/amcharts4/core";
// @ts-ignore
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AbstractView } from "../abstract/AbstractView";

export class StarView extends AbstractView {

    constructor() {
        super();
    }

    render() {
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("emotion-chart", am4charts.RadarChart);
        chart.innerRadius = am4core.percent(10);

        /* Add data */
        chart.data = [{
            "emotion": "Ärger",
            "strength": 100
        }, {
            "emotion": "Wut",
            "strength": 0
        }, {
            "emotion": "Abneigung",
            "strength": 20
        }, {
            "emotion": "Niedergeschlagenheit",
            "strength": 50
        }, {
            "emotion": "Zuneigung",
            "strength": 75
        }, {
            "emotion": "Freude",
            "strength": 33
        }, {
            "emotion": "Scham",
            "strength": 29
        }, {
            "emotion": "Trauer",
            "strength": 92
        }, {
            "emotion": "Angst",
            "strength": 40
        }];

        /* Create axes */
        // @ts-ignore
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "emotion";
        categoryAxis.renderer._gridType = "polygons";

        // @ts-ignore
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        /* Create and configure series */
        let series = chart.series.push(new am4charts.RadarSeries());
        let bullets = series.bullets.push(new am4charts.CircleBullet());
        bullets.draggable = true;
        series.name = "Stärke";
        series.dataFields.valueY = "strength";
        series.dataFields.categoryX = "emotion";
        series.strokeWidth = 3;
        series.zIndex = 2;

    }

}
