

/*booking count by hour
********************************************/
chartConfig = function(data){
						$('#chart1 svg').empty();
						var jobName = ["Travel Agent", "Counter", "Online"];
						//var data; // a global
						jobByHourConfig("chart1", jobCount(data), {
						  delay: 0,
						  transitionDuration:0,
						  groupSpacing: 0.2
						});
						
						function jobCount(data) {
						//var ss = dataArr;
						//alert(ss[0].data.length)
						   return new d3.range(0,data.length).map(function(d,i) { return {
							key: data[i].name,//jobName[i],
							values: new d3.range(0,data[i].cData.length).map( function(f,j) {
							  return { 
									   y: data[i].cData[j].count, //10 + Math.random()*100,
									   x: j
									 }
							})
							};  
						  });
						}
						
						var color = ["#377AC6", "#BD116A", "#E99DEA"];
						d3.scale.color = function() {
							return d3.scale.ordinal().range(color);
						};
						
						function jobByHourConfig(containerId, data, chartOptions) {
						  nv.addGraph(function() {
							  var chart;
							  chart = nv.models.multiBarChart()
								.margin({bottom:60})
								.transitionDuration(30)
								;
							  
							  chart.color(d3.scale.color().range());
							  chart.options(chartOptions);
							  chart.multibar
								.hideable(true);

							  chart.xAxis
								  .axisLabel("Time In 24 Hours")
								  .showMaxMin(true)
								  .tickFormat(d3.format(',0f'));

							  chart.yAxis
								  .tickFormat(d3.format(',.1f'));

							  d3.select('#' + containerId + ' svg')
								  .datum(data)
								 .call(chart);
							  
							  nv.utils.windowResize(chart.update);

							  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

							  return chart;
						  });
						}
}	//end booking count by hour
