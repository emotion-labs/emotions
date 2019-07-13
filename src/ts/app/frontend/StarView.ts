import { AbstractView } from './AbstractView';

export class StarView extends AbstractView {

    constructor() {
        super();
    }

    render() {
        // am4core.useTheme(am4themes_animated);

        // let chart = am4core.create("emotion-chart", am4charts.RadarChart);
        // chart.innerRadius = am4core.percent(10);

        // /* Add data */
        // chart.data = [{
        //     "emotion": "Ärger",
        //     "strength": 100
        // }, {
        //     "emotion": "Wut",
        //     "strength": 0
        // }, {
        //     "emotion": "Abneigung",
        //     "strength": 20
        // }, {
        //     "emotion": "Niedergeschlagenheit",
        //     "strength": 50
        // }, {
        //     "emotion": "Zuneigung",
        //     "strength": 75
        // }, {
        //     "emotion": "Freude",
        //     "strength": 33
        // }, {
        //     "emotion": "Scham",
        //     "strength": 29
        // }, {
        //     "emotion": "Trauer",
        //     "strength": 92
        // }, {
        //     "emotion": "Angst",
        //     "strength": 40
        // }];

        // /* Create axes */
        // // @ts-ignore
        // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        // categoryAxis.dataFields.category = "emotion";
        // categoryAxis.renderer._gridType = "polygons";

        // // @ts-ignore
        // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // /* Create and configure series */
        // let series = chart.series.push(new am4charts.RadarSeries());
        // let bullets = series.bullets.push(new am4charts.CircleBullet());
        // bullets.draggable = true;
        // series.name = "Stärke";
        // series.dataFields.valueY = "strength";
        // series.dataFields.categoryX = "emotion";
        // series.strokeWidth = 3;
        // series.zIndex = 2;

    }

}


// /* init globals */

// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');

// // limit fps
// var fps = 15;
// var now;
// var then = Date.now();
// var interval = 1000/fps;
// var delta;
// var speed = 1;

// var draggable = false;
// var mouseX,mouseY;

// var width=canvas.width;
// var height=canvas.height;

// //Browser support touch or mouse event ?
// var isTouchSupported = 'ontouchstart' in window;
// var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
// var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
// var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

// ////////////////////////////////////////

// /* Loop */

// ;(function () {
//   function main() {
//     window.requestAnimationFrame( main );
//     now = Date.now();
//     delta = now - then;
//     if (delta > interval || speed.value>0) {
// 			then = now - (delta % interval);
// 			activities.radar.loop();
// 		}
//   }
//   main(); // Start the cycle
// })();

// ///////////////////////////////////////////

// /* RADAR Class
// *  data: array of base/minimal value for each axis
// *  x: horizontal center of the radar on the canvas
// *  y: vertical center of the radar on the canvas
// *  radius: radius of the radar
// */

// var Radar=function(data,x,y,radius){

// 	this.dataset = data.slice(0);
// 	this.centerX = x || Math.floor(canvas.width / 2);
// 	this.centerY = y || Math.floor(canvas.height / 2);
// 	this.radius = radius || Math.floor(canvas.width / 2)-50;//added padding
// 	this.handles = new Array();
// 	this.handleRadius=10;
// 	this.step=360/this.dataset.length;

// 	ctx.lineCap = 'round';
// 	this.radgrad = ctx.createRadialGradient(this.centerX,this.centerY,this.radius/50,this.centerX,this.centerY,this.radius);
// 	this.radgrad.addColorStop(0, 'rgba(0,255,0,0)');
// 	this.radgrad.addColorStop(0.5, 'rgb(255,200,0)');
// 	this.radgrad.addColorStop(1, 'rgba(255,0,0,0)');

// };

// Radar.prototype={

// 	//draw Radar
// 	drawBackground: function() {

// 		var centerX = this.centerX;
// 		var centerY = this.centerY;
// 		var radius = this.radius;
// 		var step = this.step;

// 		ctx.beginPath();
// 		for (i=0;i<this.dataset.length;i++){

// 		  	ctx.lineWidth = 1;
// 		    	ctx.strokeStyle = this.radgrad;

// 			var pos = this.lineToAngle(ctx, centerX, centerY, radius, i*step-90);
// 			ctx.stroke();
// 		}
// 		ctx.closePath();
// 		ctx.stroke();
// 	},

// 	drawArea: function() {

// 		var centerX = this.centerX;
// 		var centerY = this.centerY;
// 		var radius = this.radius;
// 		var step = this.step;
// 		var handles = this.handles;

// 		ctx.beginPath();
// 		for (i=0;i<this.dataset.length;i++){

// 			var pos = this.pointToAngle(ctx, centerX, centerY, radius*this.dataset[i], i*step-90);
// 			handles.splice(i,1,pos);

// 			if(i==0){
// 				ctx.moveTo(pos.x, pos.y);
// 			}else{
// 				ctx.lineTo(pos.x, pos.y);
// 			}
// 		}
// 		ctx.closePath();
// 		ctx.strokeStyle="rgba(255,255,255,0.7)";
// 		ctx.fillStyle="rgba(255,255,255,0.3)";
// 		ctx.lineWidth = 3;
// 		ctx.fill();
// 		ctx.stroke();
// 	},

// 	drawHandles: function(){

// 		var centerX = this.centerX;
// 		var centerY = this.centerY;
// 		var radius = this.radius;
// 		var step = this.step;
// 		var handles = this.handles;
// 		var handleRadius = this.handleRadius;

// 		ctx.strokeStyle="rgba(180,200,255,0.7)";
// 		ctx.fillStyle="rgba(180,200,255,0.5)";
// 		ctx.lineWidth = 3;

// 		for (i=0;i<this.dataset.length;i++){
// 			ctx.beginPath();
// 			ctx.arc(handles[i].x,handles[i].y,handleRadius,0,2*Math.PI,true);
// 			ctx.fill();
// 			ctx.stroke();
// 		}
// 	},

// 	drawLabel: function(){

// 		var centerX = this.centerX;
// 		var centerY = this.centerY;
// 		var radius = this.radius;
// 		var step = this.step;
// 		var handles = this.handles;

// 		ctx.fillStyle="rgba(255,255,255,1)";
// 		ctx.font = "12pt Arial,sans-serif";
// 		ctx.textAlign= "center";

// 		for (i=0;i<this.dataset.length;i++){
// 			var pos = this.lineToAngle(ctx, centerX, centerY, radius+20, i*step-90);
// 			ctx.fillText(dataLabel[i], pos.x, pos.y,200);
// 		}
// 	},

// 	lineToAngle: function (ctx, x1, y1, length, angle) {

// 		ctx.moveTo(x1, y1);
// 		var target= this.pointToAngle(ctx, x1, y1, length, angle);
// 		ctx.lineTo(target.x,target.y);

// 		return target;
// 	},

// 	pointToAngle: function(ctx, x1, y1, dist, angle){

// 		angle *= Math.PI / 180;
// 		var x2 = x1 + dist * Math.cos(angle),
// 		    y2 = y1 + dist * Math.sin(angle);

// 		return {x: x2, y: y2};
// 	},

// 	getDistance:function(pos){

// 		var centerX = this.centerX;
// 		var centerY = this.centerY;

// 		//get the distance
// 		var xs = 0;
// 		var ys = 0;

// 		xs = pos.x - centerX;
// 		xs = xs * xs;

// 		ys = pos.y - centerY;
// 		ys = ys * ys;

// 		//return distance
// 		return Math.sqrt( xs + ys );
// 	},

// 	getClosestHandle:function(x,y){

// 		var previousDist=999999999;
// 		var handle=0;
// 		var handles = this.handles;

// 	  for(i=0;i<handles.length;i++){
// 		  dx = mouseX - handles[i].x;
// 		  dy = mouseY - handles[i].y;
// 		  dist = Math.sqrt((dx*dx) + (dy*dy));

// 		  if(dist<previousDist){
// 		  	previousDist=dist;
// 		  	handle=i;
// 		  }
// 	  }

// 		return handle;
// 	},

// 	moveHandle:function(handle){

// 		if(draggable){

// 			var dist = this.getDistance({x:mouseX,y:mouseY});
// 			var maxValue=this.checkMaxValue(handle);
// 			var minValue=data[handle];

// 			var value=Math.max(Math.min(dist/this.radius,maxValue),minValue);

// 			this.dataset[handle]=value;

// 		}

// 	},

// 	checkMaxValue:function(handle){

// 		var axisValue=1/this.dataset.length;

// 		var sum=0;
// 		for(i=0;i<this.dataset.length;i++){
// 			if(i!=handle){
// 				var value=this.dataset[i]*axisValue;
// 				sum=sum+value
// 			}
// 		}

// 		var maxValue= (perks-sum)/axisValue

// 		return Math.min(maxValue,1);

// 	},

//   // Export the current values
// 	getDataset:function(){
// 		return this.dataset;
// 	}

// }


// /////////////////////////////////////////

// /* Configuration of the radar */

// var activities={

// 	radar:{
// 		init:function(){

//         // Define the labels for each axis
// 			dataLabel= ["Apple","Peach","Melon","Banana","Bacon ?"];
//         // Set the values for each axis (and the number of axis)
// 			data= [0.5,0.25,0.1,0.335,0.3];
// 			perks= 1;
// 			radar=new Radar(data,null,null,null);

// 			//Make it interactive
// 			//add the canvas listeners and functions
// 			canvas.addEventListener(startEvent, function mousedown(e){ draggable=true;}, false);
// 			canvas.addEventListener(endEvent, function mouseup(e){ draggable=false;}, false);
// 			canvas.addEventListener(moveEvent, function mousemove(e){

// 					mouseX = (e.targetTouches)? e.targetTouches[0].layerX - canvas.offsetLeft : e.layerX - canvas.offsetLeft ;
// 					mouseY = (e.targetTouches)? e.targetTouches[0].layerY - canvas.offsetTop : e.layerY - canvas.offsetTop ;

// 					var handle= radar.getClosestHandle(mouseY,mouseY);
// 					radar.moveHandle(handle);

// 			},false);

// 			state="radar";
// 		},
// 		loop:function(){
// 			ctx.fillStyle = "black";
// 			ctx.fillRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight);
// 			radar.drawBackground();
// 			radar.drawArea();
// 			radar.drawLabel();
// 			radar.drawHandles();
// 		}

// 	}
// }

// //////////////////////

// activities.radar.init();
