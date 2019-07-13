import { AbstractModel } from "./AbstractModel";

export class Emotion extends AbstractModel {

    private anger: Number = 0;
    private rage: Number = 0;
    private aversion: Number = 0;
    private depression: Number = 0;
    private affection: Number = 0;
    private joy: Number = 0;
    private shame: Number = 0;
    private sorrow: Number = 0;
    private fear: Number = 0;

}

/*

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

 */
