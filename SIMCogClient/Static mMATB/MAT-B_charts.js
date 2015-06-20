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

// Communication task chart
// Takes in an object with a channels field 
// Channel field should be an array where length of the array is the number of channels in the task
// Each element in the array should be an object of structure {name:"", avalibleFrequencies:[]}
d3.chart("Communication", {
	initialize: function(){
		var chart = this;
		
		chart.h = chart.base.h;
		chart.w = chart.base.w;
	
		chart.x = d3.scale.linear().domain([0,4]);
		chart.y = d3.scale.linear();

		chart.response = [];
		chart.alert = [];
		chart.timeout = [];
		chart.tick = [];
		
		chart.select = 0;
		
		var rectBase = chart.base.append("g")
			.classed("communication", true)
			.attr("height", chart.h)
			.attr("width", chart.w);
			
		chart.target = chart.base.append("rect")
			.classed("communication", true)
			.attr("id", "comm_target_rect");
			
		chart.target_name = chart.base.append("svg:text")
			.classed("communication", true)
			.classed("alert", false)
			.attr("text-anchor", "start")
			.attr("id", "comm_target_name");
			
		chart.target_frequency = chart.base.append("svg:text")
			.classed("communication", true)
			.classed("alert", false)
			.attr("text-anchor", "end")
			.attr("id", "comm_target_frequency");
		
		// Demo code communication que
		/*
		chart.alertFlag = false;
		*/

		// Demo code communication que
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
					
					
					// Demo code communication que
					/*
					chart.alertFlag = true;
					chart.flash();
					*/


					// Choose new Channel for alert event
					chart.totalProb = 0;												// Initialize totalProb to 0
					chart.data.channels.forEach(function(d){							// Start forEach loop over channels
						chart.totalProb += d.prob;										// Sum probs to calculate totalProb
					});																	// End forEach loop over channels
					if(chart.totalProb>0){
						var prob = Math.floor(Math.random()*chart.totalProb);			// Calculate random probablility
						var temp = 0;													// Declare and initialize temp variable
						var newChannel = 0;												// Declare and initialize index variable for channel as newChannel

						chart.data.channels.forEach(function(d){						// Start forEach loop over channels
							temp += d.prob;												// Add prob of current channel to temp
							if(temp > prob){											// Check for break condition
								return false;											// break loop
							}															// End if statement
							newChannel++;												// increment newChannel
						});																// end forEach loop

						// Choose Frequency for alert event from list given by chosen channel
						var newFrequency = Math.floor(Math.random()*chart.data.channels[newChannel].avalibleFrequency.length);

						chart.alert.forEach(function(d){d({domID: chart.target_name.attr("id")});});

						chart.data.target.name = chart.data.channels[newChannel].name;
						chart.data.target.frequency = chart.data.channels[newChannel].avalibleFrequency[newFrequency];
						chart.target_name.text(chart.data.target.name);
						chart.target_frequency.text(chart.data.target.frequency/10);
						chart.target_name.classed("alert",true);
						chart.target_frequency.classed("alert",true);
						
						
						
						setTimeout(function(){
							if(chart.target_name.classed("alert")){
								chart.timeout.forEach(function(d){d({domID: chart.target_name.attr("id")});});
								// Demo code communication que
								/*
								chart.alertFlag = false;
								*/
							}
							chart.target_name.classed("alert",false);
							chart.target_frequency.classed("alert",false);
						}, chart.rt);
					}
					setTimeout(chart.alertEvent, chart.eventFunction());
				};
		
		
 		setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction)}, 1);
		
		
		
		this.layer("communication", rectBase, {
			dataBind: function(data){
				var chart = this.chart();
				chart.data = data;
				chart.y.domain([0,data.channels.length*1.25+3.75]);
				
				

				return this.selectAll("g").data(data.channels);
			},
			
			insert: function(data){
				var chart = this.chart();
				
				chart.x.range([0, +chart.w]);
				chart.y.range([+chart.h, 0]);
				
				chart.target.attr("width", chart.x(2))
				.attr("height", chart.y(0)-chart.y(1))
				.attr("x", chart.x(1))
				.attr("y", chart.y(chart.data.channels.length*1.25+2.75));
				
				
				
				var grps = this.append("g")
								.classed("communication", true);
				
				grps.append("rect")
					.classed("highlighted", function(d,i){return chart.select==i})
					.attr("width", chart.x(2))
					.attr("height", chart.y(0)-chart.y(1))
					.attr("id", function(d,i){return "comm_channel_"+i+"_rect";});
				
				grps.append("svg:text")
					.classed("communication", true)
					.attr("text-anchor", "end")
					.attr("x", chart.x(1.8))
					.attr("y", chart.y(0)-chart.y(.75))
					.attr("id", function(d,i){return "comm_channel_"+i+"_frequency";})
					.text(function(d){return (d.frequency = d.avalibleFrequency[0])/10;});
				
				grps.append("svg:text")
					.classed("communication", true)
					.attr("text-anchor", "start")
					.attr("x", chart.x(.2))
					.attr("y", chart.y(0)-chart.y(.75))
					.attr("id", function(d,i){return "comm_channel_"+i+"_name";})
					.text(function(d){return d.name});

				
				return grps;
			},
			
			events: {
				"enter": function(){
					var chart = this.chart();

					channel = Math.floor(Math.random()*chart.data.channels.length);
					frequency = Math.floor(Math.random()*chart.data.channels[channel].avalibleFrequency.length);

					chart.target_name.text(chart.data.channels[channel].name)
						.attr("x", chart.x(1.2))
						.attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));
						
					chart.target_frequency.text(chart.data.channels[channel].avalibleFrequency[frequency]/10)
						.attr("x", chart.x(2.8))
						.attr("y", chart.y(chart.data.channels.length*1.25+2.75)+chart.y(0)-chart.y(.75));
					
					return this.attr("transform", function(d,i){
							return "translate("+[chart.x(1),chart.y(chart.data.channels.length*1.25+.75-i*1.25)]+")";
					});
				},
				"update": function(){
					var chart = this.chart();
					
					this.select("rect")
							.classed("highlighted", function(d,i){return chart.select==i})
							.attr("width", chart.x(2))
							.attr("height", chart.y(0)-chart.y(1));
							
					this.selectAll("text")
							.text(function(d){return d.name})
							.attr("y", chart.y(0)-chart.y(.75));
					
					this.select("text")
							.text(function(d){return d.frequency/10;});

					var temp=this;

					
					
					return this.attr("transform", function(d,i){
							return "translate("+[chart.x(1),chart.y(chart.data.channels.length*1.25+.75-i*1.25)]+")";
					});
				},
				"exit": function(){
					return this.remove();
				}
			}
		});
	},
	
	// Checks to see if the currently selected channel and frequency matches the target channel and frequency
	accept: function() {
		var chart = this;
		chart.response.forEach(function(d){d({domID:"accept", ascii: chart.data.controller.accept});});
		if(chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency){
			// Demo code communication que
			/*
			chart.alertFlag = false;
			*/
		}
		chart.target_name.classed("alert", (chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency) ? 
			false : chart.target_name.classed("alert"));
		
		chart.target_frequency.classed("alert", (chart.data.target.name == chart.data.channels[chart.select].name && chart.data.target.frequency==chart.data.channels[chart.select].frequency) ? 
			false : chart.target_frequency.classed("alert"));
		
	},
	
	// Changes which channel is selected to the one bellow the currently selected one
	// If at the end of the list it loops back to the beginning
	indexUp: function(){
		var chart = this;
		chart.response.forEach(function(d){d({domID:"Index Up", ascii: chart.data.controller.indexUp});});
		chart.select=(chart.select+1)%chart.data.channels.length;
		chart.draw(chart.data);
	},
	
	// Changes which channel is selected to the one above the currently selected one
	// If at the beginning of the list it loops back to the end
	indexDown: function(){
		var chart = this;
		chart.response.forEach(function(d){d({domID:"Index Down", ascii: chart.data.controller.indexDown});});
		chart.select = chart.select==0 ? chart.data.channels.length-1 : chart.select-1;
		chart.draw(chart.data);
	},
	
	// Increases the frequency of the currectly selected channel
	frequencyUp: function(){
		var chart = this;
		chart.response.forEach(function(d){d({domID:"Frequency Up", ascii: chart.data.controller.frequencyUp});});
		chart.data.channels[chart.select].frequency+=2;
		chart.draw(chart.data);
	},
	
	// Increases the frequency of the currectly selected channel
	frequencyDown: function(){
		var chart = this;
		chart.response.forEach(function(d){d({domID:"Frequency Down", ascii: chart.data.controller.frequencyDown});});
		chart.data.channels[chart.select].frequency-=2;
		chart.draw(chart.data);
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
	// The event function is the time until the next event happens
	eventFunc: function(d){
		if(!arguments.length)
			return this.eventFunction;
		this.eventFunction = d;
		return this;
	},
	
	// If no arguments are passed returns the allowed response time
	// Other wise sets the allowed response time to the value passed in
	responseTime: function(d){
		if(!arguments.length)
			return this.rt;
		this.rt = d;
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

// Tracking task chart
// Takes in an object with an orbits field  
// Orbits field should be an array where length of the array is the number of orbits in the task
// Each element in the array should be an object of structure {points:[], interval:#, radius:#}
d3.chart("Tracking", {
	initialize: function(){
		var chart = this;
	
		chart.h = chart.base.h;
		chart.w = chart.base.w;

		chart.response = [];
		chart.alert = [];
		chart.timeout = [];
		chart.tick = [];
		
		chart.mouseEvent = {x:0, y:0};
		
		chart.x = d3.scale.linear().domain([0,1]);
		chart.y = d3.scale.linear().domain([0,1]);

		// Demo code tracking que
		/*
		chart.alertFlag = false;
		*/

		// Demo code tracking que
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

		chart.index = 0;
		
		chart.translateAlong = function(path){
			var l = path.getTotalLength();
				return function(d,i,a){
					return function(t){
						var p = path.getPointAtLength(t*l);
						return "translate("+p.x+","+p.y+")";
					};
				};
		};
		
		chart.translate = function(d){
			d3.select(this).transition()
				.duration(d.interval)
				.ease("linear")
				.attrTween("transform", chart.translateAlong(d3.select(this).select("path").node()))
				.each("end", chart.translate);
				
		};
		
		var pathBase = chart.base.append("g")
			.attr("width", chart.w)
			.attr("height", chart.h);
			
		var trackingArea = chart.base.append("rect")
			.attr("width", chart.w)
			.attr("height", chart.h)
			.attr("id", "tracking_area")
			.style("fill-opacity", 0)
			.style("cursor", "move")
			.on("mousemove", function(){chart.mouseLocation(event);})
			.on("click", function(){var temp = d3.select(this); chart.missClick(temp.attr("id"))});
			
		var circleBase = chart.base.append("g")
			.attr("width", chart.w)
			.attr("height", chart.h);

		chart.circleBase = circleBase;
		
		chart.refresh=100;
		
		chart.alertEvent = function(){
			if(d3.select("#track_circle_"+chart.index).classed("alert")){
				chart.timeout.forEach(function(d){d({domID: d3.select("#track_circle_"+chart.index).attr("id")});});
				// Demo code tracking adaptation
				// chart.data[chart.index].correct--;
				// if(chart.data[chart.index].correct<=-2){
				// 	chart.data[chart.index].correct=0;
				// 	chart.data[chart.index].interval += 500;
				// }
			}
			// Demo code tracking que
			/*
			chart.alertFlag=true;
			chart.flash();
			*/

			d3.select("#track_circle_"+chart.index).classed("active", false).classed("alert",false);					// Deactivate current circle
			
			chart.totalProb = 0;																						// Initialize totalProb to 0
			chart.data.forEach(function(d){																				// Start forEach loop over data
				chart.totalProb += d.prob;																				// Sum probs to calculate totalProb
			});																											// End forEach loop over data
			if(chart.totalProb>0){
				var prob = Math.floor(Math.random()*chart.totalProb);														// Calculate random probablility
				var temp = 0;																								// Declare and initialize temp variable
				chart.index = 0;																							// initialize index variable for orbit

				chart.data.forEach(function(d){																				// Start forEach loop over channels
					temp += d.prob;																							// Add prob of current data to temp
					if(temp > prob){																						// Check for break condition
						return false;																						// break loop
					}																										// End if statement
					chart.index++;																							// increment index
				});																											// end forEach loop over data

				chart.alert.forEach(function(d){d({domID: d3.select("#track_circle_"+chart.index).attr("id")});});			// Call alert functions
				d3.select("#track_circle_"+chart.index).classed("alert",true).classed("active",true);						// Set circle to active and alert
			}
			setTimeout(chart.alertEvent, chart.eventFunction());														// Start timer for call of next alert event
		};
		
		setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction);}, 1);
		
		setInterval(function(){
			state = [];
			
			circleBase.selectAll("circle").each(function(d){
				if(d3.select(this).classed("alert")){
					state.push(2);
				}
				else if(d3.select(this).classed("active")){
					state.push(1);
				}
				else{
					state.push(0);
				}
			});
			chart.tick.forEach(function(d){d({event: chart.mouseEvent, state: state});});
		},chart.refresh);
		
		this.layer("path", pathBase, {
			dataBind: function(data){
				var chart = this.chart();
				
				chart.data = data.orbits;

				return this.selectAll("path").data(data.orbits);
			},
			
			insert: function(data){
				var chart = this.chart();
				
				chart.x.range([0,chart.w]);
				chart.y.range([chart.h,0]);
				

				
				// var lineFunction = d3.svg.line()
				// 	.x(function(d){return chart.x(d[0])})
				// 	.y(function(d){return chart.y(d[1])})
				// 	.interpolate("basis-closed")
				
				return this.append("path")
						.style("stroke","white");
			},
			
			events: {
				"enter": function(){
					var chart = this.chart();

					var lineFunction = d3.svg.line()
					.x(function(d){return chart.x(d.x)})
					.y(function(d){return chart.y(d.y)})
					.interpolate("basis-closed");

					return this.attr("d", function(d){return lineFunction(d.points);}).attr("id", function(d,i){return "track_path_"+i});
				},
				"update": function(){
					var chart = this.chart();

					var lineFunction = d3.svg.line()
					.x(function(d){return chart.x(d.x)})
					.y(function(d){return chart.y(d.y)})
					.interpolate("basis-closed")

					return this.attr("d", function(d){return lineFunction(d.points);}).attr("id", function(d,i){return "track_path_"+i});
				},
				"exit": function(){
					return this.remove();
				}
			
			}
		});
		
		this.layer("circles", circleBase, {
			dataBind: function(data){
				var chart = this.chart();
				
				chart.data = data.orbits;
				
				return this.selectAll("circle").data(data.orbits);
			},
			
			insert: function(data){
				var chart = this.chart();
				
				chart.x.range([0,chart.w]);
				chart.y.range([chart.h,0]);
					
				
				
				var circles = this.append("circle")
					.classed("tracking", true)
					.style("cursor", "move")
					.on("click", function(d){var temp = d3.select(this); temp.classed("alert") ? chart.activate(temp.attr("id")):chart.missClick(temp.attr("id"))})
					.on("mousemove", function(){chart.mouseLocation(event)});
				
				circles.append("path")
					.style("stroke","none");
					
				return circles;
						
			},
			
			events: {
				"enter":function(){
					var chart = this.chart();
					
					var lineFunction = d3.svg.line()
					.x(function(d){return chart.x(d.x)})
					.y(function(d){return chart.y(d.y)})
					.interpolate("basis-closed");

					this.select("path").attr("d", function(d){return lineFunction(d.points);});

					this.each(chart.translate);
					
					return this.attr("r", function(d){return d.radius;})
						.attr("transform", function(d){return "translate("+chart.x(d.points[0].x)+","+chart.y(d.points[0].y)+")";})
						.attr("id", function(d,i){return "track_circle_"+i;});
				},
				
				"update": function(){
					var chart = this.chart();

					var lineFunction = d3.svg.line()
					.x(function(d){return chart.x(d.x)})
					.y(function(d){return chart.y(d.y)})
					.interpolate("basis-closed")
					
					return this.attr("r", function(d){return d.radius;})
						.attr("transform", function(d){return "translate("+chart.x(d.points[0].x)+","+chart.y(d.points[0].y)+")";})
						.attr("id", function(d,i){return "track_circle_"+i;}).select("path").attr("d", function(d){return lineFunction(d.points);});
				},
				
				"exit": function(){
					return this.remove();
				}
			}
		});
	},

	// Records a miss click in the data
	missClick: function(obj){
		var chart = this;
		this.response.forEach(function(d){d({correct: "false", domID: obj});});
		// Demo code tracking adaptation
		// chart.data[chart.index].correct--;
		// if(chart.data[chart.index].correct<=-2){
		// 	chart.data[chart.index].correct=0;
		// 	chart.data[chart.index].interval += 500;
		// }
	},

	// Changes an alerted circle from alerted state to active state
	activate: function(circle){
		var chart = this;
		this.response.forEach(function(d){d({correct: "true", domID: circle});});
		d3.select("#"+circle).classed("alert", false);
		// Demo code tracking que
		/*
		chart.alertFlag = false;
		*/
		// Demo code tracking adaptation
		// chart.data[chart.index].correct++;
		// if(chart.data[chart.index].correct>=-2){
		// 	chart.data[chart.index].correct=0;
		// 	chart.data[chart.index].interval = chart.data[chart.index].interval<=500 ? 0:chart.data[chart.index].interval-500;
		// }
	},

	// If no arguments are passed returns the mouse location
	// Other wise sets the mouse location to the value passed in
	// The mouse location is the location of the mouse in the data
	// NOTE: does not actualy move the mouse
	// When changing the mouse location in the data also logs the new location to the database
	mouseLocation: function(pos){
		if(!arguments.length)
			return this.mouseEvent;
		var active = this.circleBase.selectAll("circle").filter(function(d,i){
			return d3.select(this).classed("active")
		});
		this.mouseEvent = {x:pos.x,y:pos.y};
		if(!active[0].length){
			this.mouseMove.forEach(function(d){d({x:pos.x, y:pos.y, targetX:0, targetY:0, domID:"NULL"})});
		}
		else{
			var temp = d3.select(active[0][0]);			
			this.mouseMove.forEach(function(d){d({x:pos.x, y:pos.y, targetX:(document.getElementById(temp.attr("id")).getBoundingClientRect().left+(document.getElementById(temp.attr("id")).getBoundingClientRect().width/2)),
							 targetY:(document.getElementById(temp.attr("id")).getBoundingClientRect().top+(document.getElementById(temp.attr("id")).getBoundingClientRect().height/2)), domID:temp.attr("id")})});
		}
		
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
	
	// If no arguments are passed returns the refresh rate
	// Other wise sets the refresh rate to the value passed in
	// The refresh rate is the rate at which the state of the task gets recorded
	refreshRate: function(r){
		if(!arguments.length)
			return this.refresh;
		this.refresh = r;
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

// Monitoring task chart
// Takes in an object with a buttons field and sliders field
// Buttons field should be an array where length of the array is the number of buttons in the task
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

// Resource task chart
// Takes in an object with a tanks field, generators field, and switchs field
d3.chart("Resource", {
	initialize: function(){
		var chart = this;
	
		chart.h = chart.base.h;
		chart.w = chart.base.w;
	
		chart.x = d3.scale.linear().domain([0,18]);
		chart.y = d3.scale.linear().domain([0,9]);

		chart.refresh = 100;

		chart.response = [];
		chart.alert = [];
		chart.timeout = [];
		chart.tick = [];

		var tankBase = chart.base.append("g")
			.attr("width", chart.w)
			.attr("height", chart.h);

		var genBase = chart.base.append("g")
			.attr("width", chart.w)
			.attr("height", chart.h);

		var switchBase = chart.base.append("g")
			.attr("width", chart.w)
			.attr("height", chart.h);

		// Demo code resource que
		/*
		chart.alertFlag = [];
		*/

		// Demo code resource que
		// Used for temporary flashing of border
		/*
		chart.flash = function(){
			if(chart.alertFlag[0] || chart.alertFlag[1]){
				console.log(chart.base.select(".background").classed("backgroundAlert"));
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

		setInterval(function(){
			var state = [];
			chart.data.switches.forEach(function(d){
				if(d.alert){
					state.push(2);
				}
				else if(d.on){
					state.push(1);
				}
				else{
					state.push(0);
				}
			});
			chart.tick.forEach(function(d){d({state:state, tanks:chart.data.tanks});});
			chart.data.tanks.forEach(function(d,i){
				d.delta=d.decayRate*chart.refresh>d.resource? -d.resource:-d.decayRate*chart.refresh;
			});
			
			chart.data.generators.forEach(function(d){
				d.delta=0;
			});
			
			chart.data.switches.forEach(function(d){
				var delta = Math.max(Math.min(d.transferRate*d.on*chart.refresh, d.source.resource+d.source.delta, d.target.maxResource-d.target.resource+d.target.delta),0);
				d.source.delta -= delta;
				d.target.delta += delta;
			});
			
			chart.data.tanks.forEach(function(d,i){
				d.resource += d.delta;
				// Demo
					/*
				if(d.targetRangeMin!=null){
					
					if(d.resource<d.targetRangeMin || d.resource>d.targetRangeMax){
						if(!chart.alertFlag[i]){
							chart.alertFlag[i]=true;
							chart.flash();
						}
					}
					else{
						chart.alertFlag[i]=false;
					}

				}
				*/
			});
			
			chart.data.switches.forEach(function(d, i){
				if(d.source.resource == 0)
					d.on = false;
				d.count += chart.refresh;
				if(d.count >= d.repairTime)
					d.alert = false;
			});
			
			tankBase.selectAll("rect").filter(function(d,i){return !(i%2)}).attr("height", function(d){return chart.y(0)-chart.y(d.height*d.resource/d.maxResource);})
									.attr("y", function(d){return chart.y(d.y-d.height*(1-d.resource/d.maxResource));});
			tankBase.selectAll("text").text(function(d){return Math.round(d.resource);});
			switchBase.selectAll("path").classed("alert", function(d){return d.alert;});

		},chart.refresh);

		chart.alertEvent = function(){
			chart.totalProb = 0;																						// Initialize totalProb to 0
			chart.data.switches.forEach(function(d){																	// Start forEach loop over switches
				chart.totalProb += d.prob;																				// Sum probs to calculate totalProb
			});																											// End forEach loop over switches

			var prob = Math.floor(Math.random()*chart.totalProb);														// Calculate random probablility
			var temp = 0;																								// Declare and initialize temp variable
			index = 0;																									// initialize index variable for switches
			if(chart.totalProb > 0){
				chart.data.switches.forEach(function(d){																	// Start forEach loop over channels
					temp += d.prob;																							// Add prob of current switch to temp
					if(temp > prob){																						// Check for break condition
						return false;																						// break loop
					}																										// End if statement
					index++;																								// increment index
				});																											// end forEach loop over switches

				chart.data.switches[index].on=false;
				chart.data.switches[index].alert=true;
				chart.data.switches[index].count=0;
				chart.alert.forEach(function(d){d({domID: "resource_switch_"+index});});
				switchBase.selectAll("path").classed("on", function(d,i){return d.on;})
							.classed("alert", function(d,i){return d.alert});
			}

			setTimeout(chart.alertEvent, chart.eventFunction());
		}
		
		setTimeout(function(){setTimeout(chart.alertEvent, chart.startFunction);}, 1);
		
		this.layer("tanks", tankBase, {
			dataBind: function(data){
				var chart = this.chart();

				chart.data = data;
	

				return this.selectAll("g")
					.data(data.tanks);
			},

			insert: function(data){
				var chart = this.chart();

				chart.x.range([0,+chart.w]);
				chart.y.range([+chart.h,0]);

				var grps = this.append("g");

				grps.append("rect")
					.classed("resource", true);

				grps.append("line")
					.classed("resourceManagement", true)
					.attr("stroke-width", "8px");

				grps.append("line")
					.classed("resourceManagement", true)
					.attr("stroke-width", "8px");

				grps.append("text")
					.classed("resourceManagement", true);

				grps.append("rect")
					.classed("resourceManagement", true);

				return grps;
			},
			
			events: {
				"enter": function(){
					var chart = this.chart();



					this.select("rect").attr("width", function(d){d.resource = d.startingResource; return chart.x(d.width);})
						.attr("height", function(d){return chart.y(0)-chart.y(d.height*d.resource/d.maxResource);})
						.attr("x", function(d){return chart.x(d.x);})
						.attr("y", function(d){return chart.y(d.y-d.height*(1-d.resource/d.maxResource));})
						.attr("id", function(d,i){return "management_tank_"+i+"_resource";});

					this.select("line").attr("x1", function(d){return chart.x(d.x)-4;})
						.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
						.attr("x2", function(d){return chart.x(d.x)-4;})
						.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
						.attr("id", function(d,i){return "management_tank_"+i+"_target_left";});

					this.selectAll("line").filter(function(d,i){return i==1;})
						.attr("x1", function(d){return chart.x(d.x+d.width)+4;})
						.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
						.attr("x2", function(d){return chart.x(d.x+d.width)+4;})
						.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));})
						.attr("id", function(d,i){return "management_tank_"+i+"_target_right";});

					this.select("text").attr("x", function(d){return chart.x(d.x+d.width*.3);})
						.attr("y", function(d){return chart.y(d.y-d.height-.5);})
						.text(function(d){return d.resource;})
						.attr("id", function(d,i){return "management_tank_"+i+"_amount";});

					this.selectAll("rect").filter(function(d,i){return i==1}).attr("width",function(d){return chart.x(d.width);})
						.attr("height",function(d){return chart.y(0)-chart.y(d.height);})
						.attr("x",function(d){return chart.x(d.x);})
						.attr("y",function(d){return chart.y(d.y);})
						.attr("id", function(d,i){return "management_tank_"+i+"_rect"});

					return this;
				},

				"update": function(){
					this.select("line").attr("x1", function(d){return chart.x(d.x)-4;})
						.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
						.attr("x2", function(d){return chart.x(d.x)-4;})
						.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));});

					this.selectAll("line").filter(function(d,i){return i==1;})
						.attr("x1", function(d){return chart.x(d.x+d.width)+4;})
						.attr("y1", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMax/d.maxResource));})
						.attr("x2", function(d){return chart.x(d.x+d.width)+4;})
						.attr("y2", function(d){if(d.targetRangeMax==null)return 0; return chart.y(d.y-d.height*(1-d.targetRangeMin/d.maxResource));});

					return this;
				},

				"exit": function(){
					return this.remove();
				}
			}
		});

		this.layer("generators", genBase,{
			dataBind: function(data){
				var chart = this.chart();

				chart.data = data;

				return this.selectAll("circle").data(data.generators);
			},

			insert: function(){
				var chart = this.chart();


				return this.append("circle").attr("class", "resourceManagement");
						
			},

			events: {
				"enter": function(){
					var chart = this.chart();

					return this.attr("r", function(d){d.resource = Number.POSITIVE_INFINITY; return chart.y(0)-chart.y(d.r);})
						.attr("cx", function(d){return chart.x(d.cx);})
						.attr("cy", function(d){return chart.y(d.cy);})
						.attr("id", function(d,i){return "resource_generator_"+i;});
				},
				"exit": function(){
					this.remove();
				}
			}
		});

		this.layer("switches", switchBase,{
			dataBind: function(data){
				var chart = this.chart();

				chart.data = data;

				return this.selectAll("g").data(data.switches);
			},

			insert: function(){
				var chart = this.chart();

				var grps = this.append("g");

				grps.append("line")
					.classed("resourceManagement", true);

				grps.append("path")
					.classed("switches", true)
					.attr("d",path_data);

				grps.append("text")
					.classed("resourceManagement", true);

				return grps;
			},
			events:{
				"enter": function(){
					var chart = this.chart();

					this.select("line").attr("x1", function(d){return chart.x(d.x1);})
						.attr("y1", function(d){return chart.y(d.y1);})
						.attr("x2", function(d){return chart.x(d.x2);})
						.attr("y2", function(d){return chart.y(d.y2);});

					this.select("path").attr("transform", function(d){d.alert = false; return ["translate("+chart.x((d.x1+d.x2)/2-.25*Math.cos(d.rotation*Math.PI/180)+.5*Math.sin(d.rotation*Math.PI/180))
																					+","+chart.y((d.y1+d.y2)/2+.5*Math.cos(d.rotation*Math.PI/180)+.25*Math.sin(d.rotation*Math.PI/180))+")",
																				"scale("+chart.x(.5)/5+","+(chart.y(0)-chart.y(1))/10+")",
																				"rotate("+d.rotation+")"];})
						.attr("id", function(d,i){return "resource_switch_"+i;});

					this.select("text").attr("x", function(d){return chart.x(d.textX);})
						.attr("y", function(d){return chart.y(d.textY);})
						.text(function(d){return d.keyboard;});

						

					return this;
				},

				"update": function(){

					this.select("text").attr("x", function(d){return chart.x(d.textX);})
						.attr("y", function(d){return chart.y(d.textY);})
						.text(function(d){return d.keyboard;});

					return this.select("path").classed("on", function(d){d.alert = false; return d.on});
				},

				"exit": function(){
					return this.remove();
				}
			}
		});
	},

	// If no arguments are passed returns the refresh rate
	// Other wise sets the refresh rate to the value passed in
	// The refresh rate is how often the tanks update their values
	refreshRate: function(r){
		if(!arguments.length)
			return this.refresh;
		this.refresh = r;
		return this;
	},

	// Changes the state of the passed in switch
	// If the switch is broken nothin happens
	flipSwitch: function(switchNum){
		var chart = this;
		chart.response.forEach(function(d){d({domID:"resource_switch_"+switchNum, ascii: chart.data.switches[switchNum].key});});
		chart.data.switches.forEach(function(d,i){
			d.on = (switchNum == i && !d.alert) ? !d.on: d.on;
		});
		chart.draw(chart.data)
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