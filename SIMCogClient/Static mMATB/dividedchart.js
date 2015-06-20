var path_data = "M 0 3 L 1 3 L 1 0 L 5 5 L 1 10 L 1 7 L 0 7 z";

// Creates an svg on a passed in selection with given scaled width and height and margin
// Uses width and height to create an x and y scale
function get_generic_svg(selection, width, height, scaledWidth, scaledHeight, margin) {
	var width = width - margin.left - margin.right,
		height = height - margin.top - margin.bottom;
	var svg = selection.append("svg")
		.attr("width", scaledWidth + margin.left + margin.right)
		.attr("height", scaledHeight + margin.top + margin.bottom)
		.append("g")
		.attr("transform", ["translate(" + margin.left + "," + margin.top + ")","scale("+(scaledWidth/width)+","+(scaledHeight/height)+")"]);
	var x = d3.scale.linear()
		.range([0, width]);
	var y = d3.scale.linear()
		.range([height,0]);
	var background = svg.append("rect")
						.attr("class", "background")
						.attr("width", width)
						.attr("height", height)
						.attr("x", 0)
						.attr("y", 0);
	svg.w = width;
	svg.h = height;
	return svg;
}


// Monitoring task chart
// Takes in an object with a labels field and questions field
// label field should be an array where length of the array is the number of buttons in the task
// Each element in the array should be an object of structure {color:"", button:#, key:"", alert_color:"", autoCorrect:#}
// sliders field should be an array where length of the array is the number of sliders in the task
// Each element in the array should be an object of structure {button:#, key:"", slider_interval:#, prob:#}
d3.chart("Monitoring", {
	initialize: function(){
		var chart = this;
	
		chart.h = chart.base.h;
		chart.w = chart.base.w;
		
		chart.x = d3.scale.linear();
		chart.y = d3.scale.linear();

		chart.totalProb = 0;

		chart.response = [];
		chart.alert = [];
		chart.timeout = [];

		//chart.correct = 0;
		
		var scalesBase = this.base.append("g")
			.classed("monitoring", true)
			.attr("height", this.h)
			.attr("width", this.w);
			
		var slidersBase = this.base.append("g")
			.classed("monitoring", true)
			.attr("height", this.h)
			.attr("width", this.w);

		var buttonsBase = this.base.append("g")
			.classed("monitoring", true)
			.attr("height", this.h)
			.attr("width", this.w);

		// Demo code
		/*
		chart.missed = 0;
		*/

		// Demo code
		// Used for temporary flashing of border
		/*
		chart.flash = function(){
			if(chart.alertFlag){
				chart.base.select(".background").classed("backgroundAlert", !chart.base.select(".background").classed("backgroundAlert"));
				chart.base.select(".background")
					.transition()
					.duration(200)
					.style("stroke", chart.base.select(".background").classed("backgroundAlert") ? "crimson":"midnightblue")
					.each("end",chart.flash);
			}
			else{
				chart.base.select(".background").classed("backgroundAlert", false);
				chart.base.select(".background")
					.transition()
					.duration(200)
					.style("stroke", "midnightblue");
			}
		};
		*/

		chart.alertEvent = function(){
			
			chart.totalProb=0;
			chart.data.buttons.forEach(function(d){
				chart.totalProb += d.prob;
			});
			chart.data.scales.forEach(function(d){
				chart.totalProb += d.prob;
			});
			if(chart.totalProb>0){
				prob = Math.floor(Math.random()*chart.totalProb);
				temp = 0;
				chart.index = 0;

				chart.data.buttons.forEach(function(d){
					temp += d.prob;
					if(temp>prob){
						return false;
					}
					chart.index++;
				});
				if(temp<prob){
					chart.data.scales.forEach(function(d){
						temp += d.prob;
						if(temp>prob){
							return false;
						}
						chart.index++;
					});
				}
				if(chart.index<chart.data.buttons.length){
					chart.alert.forEach(function(d){d({domID: "monitor_button_"+chart.index});});
					// Demo code
					/*
					chart.alertFlag=true;
					if(chart.missed>=3){
						chart.flash();
					}
					*/
					chart.data.buttons[chart.index].alert = true;
	 				buttonsBase.selectAll("rect").style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
	 				setTimeout(chart.buttonTimeout, chart.data.buttons[chart.index].autoCorrect);
				}
				else{
					chart.data.scales[chart.index-chart.data.buttons.length].event=true;
					rangeIncrease = Math.floor(Math.random()*((chart.ticks-chart.slider_range[1]+chart.slider_range[0]-1)/2)+1);
					
					chart.data.event_range = [chart.slider_range[0]-rangeIncrease, chart.slider_range[1]+rangeIncrease];
					chart.data.scales[chart.index-chart.data.buttons.length].i--;
	 			}
 			}
 			setTimeout(chart.alertEvent, chart.eventFunction());
 			temp=0;
		}
		
		setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction);}, 1);
		
		chart.buttonTimeout = function(){
				if(chart.data.buttons[chart.index].alert){
					chart.timeout.forEach(function(d){d({domID: "monitor_button_"+chart.index});});	
					chart.data.buttons[chart.index].alert = false;
					buttonsBase.select("rect").style("fill",function(d,i){return d.alert ? d.alert_color : d.color});
					// Demo code
					/*
					chart.missed++;
					chart.base.select(".background").classed("backgroundAlert", false);
					chart.alertFlag=false;
					*/
				}
		}

		

		chart.translate = function(d){

			d.i++;
			var deltaY = chart.slider_range[d.i%chart.slider_range.length]-d.y;
			if(d.event){
				deltaY = chart.data.event_range[d.i%chart.slider_range.length]-d.y;
				d.alert = 0;	
			}
			if(d.alert<=2){
				d.alert++;
			}

			
			d.y += deltaY;
			d3.select(this).transition()
				.duration(Math.abs(deltaY*d.slider_interval))
				.ease("linear")
				.attr("transform", ["translate("+chart.x(d.x)+","+chart.y(d.y+2.75)+")","scale("+chart.x(.5)/5+","+(chart.y(0)-chart.y(1.5))/10+")"])
				.each("end", chart.translate);

			if(d.event){
				slider = d3.select(this);
				chart.alert.forEach(function(d){d({domID: slider.attr("id"), direction: d.i%chart.slider_range.length});});
				// Demo code
				/*
				chart.alertFlag=true;
				if(chart.missed>=3){
					chart.flash();
				}
				*/
				d.event=false;
				d.i++;
			}
			else if(d.alert==3){
				slider = d3.select(this);
				chart.timeout.forEach(function(d){d({domID: slider.attr("id")});});
				d.alert++;
				// Demo code
				/*
				d.correct--;
				chart.missed++;
				if(d.correct<=-2){
					 d.slider_interval+=500;
					 d.correct=0;
				}
				chart.alertFlag=false;
				*/
			}
		}
		
		this.layer("scale", scalesBase, {
			dataBind: function(data){
				var chart = this.chart();
				
				chart.data = data;
				
				chart.x.domain([0,2.5*data.scales.length+2.5]);
				chart.y.domain([0,chart.ticks+9]);
				
				
				
				return this.selectAll("g").data(data.scales);
			},
			
			insert: function(data){
				var chart = this.chart();
				
				chart.x.range([0, chart.w]);
				chart.y.range([chart.h, 0]);
				
				var grps = this.append("g")
					.classed("monitoring", true);
				
				
				grps.selectAll("line").data(function(d){return d3.range(0,chart.ticks);})
					.enter()
					.append("line")
					.attr("y1", function(d,i){return chart.y(i+3);})
					.attr("y2", function(d,i){return chart.y(i+3);})
					.attr("x1", chart.x(0))
					.attr("x2", chart.x(1))
					.classed("monitoring", true);
				
				chart.line = grps.append("line")
					.attr("y1", chart.y(3))
					.attr("y2", chart.y(chart.ticks+2))
					.attr("x1", chart.x(.5))
					.attr("x2", chart.x(.5))
					.classed("monitoring", true);

				grps.append("text")
					.attr("x", chart.x(0))
 					.attr("y", chart.y(1.75))
 					.classed("monitoring", true);
					
				return grps;
			},
			
			events: {
				"enter":function(){
					var chart = this.chart();
					
					var temp=0;

					this.selectAll("line").filter(function(d){if(d.key){return false}else{return true}})
						.attr("id", function(d,i){if(i==chart.ticks-1){temp++; return "monitor_slider_"+(temp-1)+"_tick_"+i;}return "monitor_slider_"+temp+"_tick_"+i;});

					temp=-1;

					this.selectAll("line").filter(function(d){if(d.key){return true}else{return false}})
						.attr("id",function(d,i){temp++; return "monitor_centerline_"+temp;});

					this.select("text")
						.text(function(d){return d.key});

					return this.attr("transform", function(d,i){return "translate("+chart.x(2.5*i+2)+","+0+")";});
				},
				
				"update":function(){
					var chart = this.chart();

					this.selectAll("line")
						.attr("y1", function(d,i){return chart.y(i+3);})
						.attr("y2", function(d,i){return chart.y(i+3);})
						.attr("x1", chart.x(0))
						.attr("x2", chart.x(1));
						

					this.selectAll("line").filter(function(d){if(d.key){return true}else{return false}})
						.attr("y1", chart.y(3))
						.attr("y2", chart.y(chart.ticks+2))
						.attr("x1", chart.x(.5))
						.attr("x2", chart.x(.5))
						.attr("id", function(d,i){return "monitor_centerline_"+i});

					this.select("text")
						.text(function(d){return d.key});
					
					return this.attr("transform", function(d,i){return "translate("+chart.x(2.5*i+2)+","+0+")";});
				},
				
				"exit":function(){
					return this.remove();
				}
			}
		});
		
		this.layer("sliders", slidersBase,{
			dataBind: function(data){
				var chart = this.chart();

				chart.data = data;

				chart.x.domain([0,2.5*data.scales.length+2.5]);
				chart.y.domain([0,chart.ticks+9]);

				return this.selectAll("path").data(data.scales);
			},

			insert: function(data){
				var chart = this.chart();

				chart.x.range([0,chart.w]);
				chart.y.range([chart.h,0]);

				return this.append("path")
					.attr("d", path_data)
					.style("stroke-width", ".6")
					.classed("monitoring",true);
			},
			events: {
				"enter":function(){
					var chart = this.chart();

					this.each(function(d,i){
						d.i = 0;
						d.y=Math.round(chart.ticks/2);
						d.x = i*2.5+1.5;
						d.alert=4;
						d.correct=0;
						if(!d.hasOwnProperty("prob")){
							d.prob = 1;
						}
						chart.totalProb += d.prob;
					});

					this.each(chart.translate);

					return this
						.attr("transform", function(d,i){return ["translate("+chart.x(d.x)+","+chart.y(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.x(.5)/5+","+ (chart.y(0)-chart.y(1.5))/10+")"]})
						.attr("id", function(d,i){return "monitor_slider_"+i;});
				},

				"update":function(){
					var chart = this.chart();

					this.each(function(d,i){
						d.x = i*2.5+1.5;
					});

					this.transition().duration(0).attr("transform", function(d,i){return ["translate("+chart.x(d.x)+","+chart.y(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.x(.5)/5+","+ (chart.y(0)-chart.y(1.5))/10+")"]});

					this.each(chart.translate);

					return this
						.attr("transform", function(d,i){return ["translate("+chart.x(d.x)+","+chart.y(Math.round(chart.ticks/2)+2.75)+")","scale("+chart.x(.5)/5+","+ (chart.y(0)-chart.y(1.5))/10+")"]})
						.attr("id", function(d,i){return "monitor_slider_"+i;});
				},

				"exit": function(){
					return this.remove();
				}

			}
		});

		this.layer("buttons", buttonsBase,{
			dataBind: function(data){
				var chart = this.chart();

				chart.data = data;
                
                chart.x.domain([0,4.75*data.buttons.length+3]);

				return this.selectAll("g").data(data.buttons);
			},

			insert: function(){
				var chart = this.chart();

				var total_width = chart.data.buttons.length*4.75+3;
		
				var rect_width = 3.75;

				var grps = this.append("g")

				grps.append("rect")
					.attr("width", chart.x(rect_width))
					.attr("height", chart.y(0)-chart.y(2))
					.attr("y", chart.y(chart.ticks+7));

				grps.append("text")
					.attr("class", "monitoring")
					.attr("x", chart.x(rect_width/2-.5))
 					.attr("y", chart.y(chart.ticks+3.75));

				return grps;
			},

			events: {
				"enter": function(){
					var chart = this.chart();

					this.each(function(d,i){
						if(!d.hasOwnProperty("prob")){
							d.prob = 1;
							
						}
						d.alert = false;
						chart.totalProb += d.prob;
					});

					var total_width = chart.data.buttons.length*4.75+3;
		
					var rect_width = 3.75;

					this.select("text").text(function(d){return d.key;});

					this.select("rect").attr("id", function(d,i){return "monitor_button_"+i;})
						.style("fill", function(d){return d.color;});

					return this.attr("transform", function(d,i){return "translate("+[chart.x(2+(i*(rect_width+1))),0]+")";});
				},

				"update": function(){
					var chart = this.chart();

					var total_width = chart.data.buttons.length*4.75+3;
		
					var rect_width = 3.75;

					this.select("text").text(function(d){return d.key;})
						.attr("x", chart.x(rect_width/2-.5))
 						.attr("y", chart.y(chart.ticks+3.75));

					this.select("rect").attr("id", function(d,i){return "monitor_button_"+i;})
						.style("fill", function(d){return d.color;})
						.attr("width", chart.x(rect_width))
						.attr("height", chart.y(0)-chart.y(2))
						.attr("y", chart.y(chart.ticks+7));

					return this.attr("transform", function(d,i){return "translate("+[chart.x(2+(i*(rect_width+1))),0]+")";});
				},

				"exit": function(){
					return this.remove();
				}
			}

		});
	},

	// Returns a given sliders current location
	getSliderLocation: function(sliderNum){
		var sliderCenter = Math.round(this.ticks/2);
		var currentPosition = d3.select("#monitor_slider_"+sliderNum).attr("transform").split(",");
		var x = currentPosition[0].split("(")[1];
		var y = currentPosition[1].split(")")[0];
		return {x:x,y:y};
	},

	// Resets a given sliders location to the middle dash if the slider is in an alert state
	resetSliders: function(sliderNum){
		var chart = this;
		var sliderCenter = Math.round(chart.ticks/2);
		var currentPosition = chart.y.invert(d3.select("#monitor_slider_"+sliderNum).attr("transform").split(",")[1].split(")")[0]);
		if((currentPosition>sliderCenter+3.75 || currentPosition<sliderCenter+1.75)){
			chart.response.forEach(function(d){d({domID:"monitor_slider_"+sliderNum, correct:true, direction: chart.data.scales[sliderNum].i, ascii:chart.data.scales[sliderNum].button});});
			chart.data.scales[sliderNum].alert=4;
			chart.data.scales[sliderNum].y = Math.round(chart.ticks/2);
			// Demo code
			/*
			chart.data.scales[sliderNum].correct++;
			chart.missed=0;
			if(chart.data.scales[sliderNum].correct>=2){
				chart.data.scales[sliderNum].slider_interval = chart.data.scales[sliderNum].slider_interval-500<=0 ? 250:chart.data.scales[sliderNum].slider_interval-500;
				chart.data.scales[sliderNum].correct=0;
			}
			chart.base.select(".background").classed("backgroundAlert", false);
			chart.alertFlag=false;
			*/
			d3.select("#monitor_slider_"+sliderNum)
					.transition()
					.duration(0)
					.attr("transform", ["translate("+chart.x(chart.data.scales[sliderNum].x)+","+chart.y(chart.data.scales[sliderNum].y+2.75)+")","scale("+chart.x(.5)/5+","+(chart.y(0)-chart.y(1.5))/10+")"])
					.each("end", chart.translate);
		}
		else{
			chart.response.forEach(function(d){d({domID:"monitor_slider_"+sliderNum, correct:"false", ascii:chart.data.scales[sliderNum].button});});
			// Demo code
			/*
			chart.data.scales[sliderNum].correct--;
			chart.missed++;
			if(chart.data.scales[sliderNum].correct<=-2){
				chart.data.scales[sliderNum].slider_interval+=500;
				chart.data.scales[sliderNum].correct=0;
			}
			*/
		}
	},
	
	// Resets a given buttons color to it's non alert color if the button is in an alert state
	resetButtons: function(buttonNum){
		var chart = this;
		if(chart.data.buttons[buttonNum].alert){
			chart.response.forEach(function(d){d({domID:"monitor_button_"+buttonNum, correct:"true", ascii:chart.data.buttons[buttonNum].button});});
			chart.data.buttons[buttonNum].alert = false;
			d3.select("#monitor_button_"+buttonNum).style("fill", chart.data.buttons[buttonNum].color);
			// Demo code
			/*
			chart.missed=0;
			chart.alertFlag=false;
			*/
			
		}
		else{
			chart.response.forEach(function(d){d({domID:"monitor_button_"+buttonNum, correct:"false", ascii:chart.data.buttons[buttonNum].button});});
			// Demo code
			/*
			chart.missed++;
			*/
		}
	},

	// If no arguments are passed returns the tick
	// Other wise sets the tick to the value passed in
	// The tick is the number of dashes on the slider's scale
	tick: function(t) {
		if(!arguments.length)
			return this.ticks;
		this.ticks = t;
		return this;
	},

	// If no arguments are passed returns the range
	// Other wise sets the range to the value passed in
	// The the range is the bounds of where the slider should bounce between when not in an alert state 
	range: function(s) {
		if(!arguments.length)
			return this.slider_range;
		this.slider_range = s;
		return this;
	},

	// If no arguments are passed returns the start function
	// Other wise sets the start function to the value passed in
	// The start function is the time until the first event happens
	startFunc: function(d){
		if(!arguments.length)
			return this.startFunction;
		this.startFunction = d;
		return this;
	},

	// If no arguments are passed returns the event function
	// Other wise sets the event function to the value passed in
	// The event function is the time until the first event happens
	eventFunc: function(d){
		if(!arguments.length)
			return this.eventFunction;
		this.eventFunction = d;
		return this;
	},
	
	// Binds a passed in function "f" to a passed in event name "name"
	when: function(name, f){
		if(!this[name]){
			this[name] = [];
		}
		this[name].push(f);
		return this;
	},
});

