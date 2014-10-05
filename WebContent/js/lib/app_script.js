/*all dash board object functions accumulated here
*************************************************************/

/*menu item JOB SUMMARY, view: showDashboardChart.js
********************************************************/
/*for file copy table details
*******************************************************/
/*file copy 1st level table
**********************************/
trackStatus = function(data){
					   $('#filecopy_statistic_tbl').dataTable().fnDestroy();
					    var logList = $('#filecopy_statistic_tbl').dataTable({
									
									"bPaginate": true,
									"bSort": true,
									"bFilter": true,
									"bProcessing": true,
									"bScrollCollapse": true,
									"aLengthMenu": [[10,15,20],[10,15,20]],
									"aaData": data,
									"processing": true,
									"columnDefs":[
									{
										"targets": [ 1 ],
										"visible": false,
										"searchable": false
									}
									],
									"aoColumns":[
									{
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "processId",
									"sTitle": "Process Id"
									},{
									"mData": "name",
									"sTitle": "Name"
									},
									{
									"mData": "message",
									"sTitle": "Message"
									},
									{
									"mData": "appPath",
									"sTitle": "App Path"
									},
									{
									"mData": "user",
									"sTitle": "User"
									},
									{
									"mData": "startTime",
									"sTitle": "Start Time"
									},
									{
									"mData": "date",
									"sTitle": "Date"
									},{
									"mData": "time",
									"sTitle": "Time"
									},{
									"mData": "status",
									"sTitle": "Status"
									},
									],
									"fnCreatedRow": function( nRow, aData, iDataIndex ) {
										//var rowId = $('tbody tr').length;
										$(nRow).attr('id', 'row'+iDataIndex);
									},
									"bRetrieve": true,
									"fnRowCallback": function(nRow, aData,  iDataIndex) {
									/*job status colour
									****************************/
									   var statusText = $('td:eq(8)',nRow).text();
									   if(statusText == "Partial"){
											$('td:eq(8)',nRow).addClass('partial');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Success"){
											$('td:eq(8)',nRow).addClass('pass');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Fail"){
											$('td:eq(8)',nRow).addClass('fail');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "FileNotAvailable"){
											$('td:eq(8)',nRow).text('File Not Available');
										}else if(statusText == "SourceNotExist"){
											$('td:eq(8)',nRow).text('Source Not Exist');
										}
										/*create 2nd level table
										****************************/
									   $(nRow).on("click", function(e){
									   lvl_01_jobId = $('td:first',nRow).text();
											create2ndTabl(this);	//global function for creating table (apps.js)
									   });
									   
										$('#filecopy_statistic_tbl_filter label input').css({'margin-bottom':'10px','border':'1px solid #e20047'});
										$('#filecopy_statistic_tbl_length label select').css({'border':'1px solid #e20047'});
									}
									
							});
							$("body").css("overflow-x", "hidden");
							logList.fnDraw();
							/*select table row
							*******************************************/
							$('#filecopy_statistic_tbl tbody').on( 'click', 'tr', function () {
								if ( $(this).hasClass('selected') ) {
									$(this).removeClass('selected');
									
								}
								else {
									logList.$('tr.selected').removeClass('selected');
									$(this).addClass('selected');
								}
							} );
					 
			
		} //end 1st level table

/*file copy 2nd level table
*********************************************/
create2ndTabl = function(dest, filecopy_date){
						
						$('#level_holder-2').remove();
						$('<tr id=\"level_holder-2\" class=\"level_check2\">'+
						'<td id=\"level-2After\" colspan=\"9\" style=\"padding-bottom:20px; background-color:#6A83A0;\">'+
						'<span style="margin-left:5px; font-size:1.3em; color:#FFF;">All Job from Id:'+lvl_01_jobId+'</span>'+'<br/>'+
						'<table id=\"level_2tbl\" class=\"\" width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >'+
						'<thead>'+
						'<tr style=\"font-size:1.1em; height:18px;\">'+
						'<th width=\"10%\">'+"Id"+'</th>'+
						'<th width=\"10%\">'+"Process Id"+'</th>'+
						'<th width=\"10%\">'+"Name"+'</th>'+
						'<th width=\"10%\">'+"Message"+'</th>'+
						'<th width=\"10%\">'+"App Path"+'</th>'+
						'<th width=\"10%\">'+"User"+'</th>'+
						'<th width=\"10%\">'+"Start Time"+'</th>'+
						'<th width=\"10%\">'+"Date"+'</th>'+
						'<th width=\"10%\">'+"Time"+'</th>'+
						'<th width=\"10%\">'+"Status"+'</th>'+
						'</tr>'+
						'</thed>'+
						'<tbody style=\"font-size:1.1em; height:18px;\">'+
						'</tbody>'+
						'</table>'+
						'</td>'+
						'</tr>').insertAfter(dest);
						
						var file2TblData = {jobType:'File', dateValue:'', statusValue:'', jobId:lvl_01_jobId};
						var fileTblData = JSON.stringify(file2TblData);
						$.ajax({
							url: AppConfigs.baseUrl+'/dashboarddetails',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:fileTblData,
							success:function(data, msg){
							var table2nd = $('#level_2tbl').dataTable({
								"bPaginate": false,
								"bSort": false,
								"bFilter": false,
								"bProcessing": true,
								"bScrollCollapse": false,
								"aaData": data,
								"processing": true,
								"columnDefs":[
								{
									"targets": [ 1 ],
									"visible": false,
									"searchable": false
								}
								],
								"aoColumns":[
								{
								"mData":"id",
								"sTitle": "Id"
								},{
								"mData": "processId",
								"sTitle": "Process Id"
								},{
								"mData": "name",
								"sTitle": "Name"
								},
								{
								"mData": "message",
								"sTitle": "Message"
								},
								{
								"mData": "appPath",
								"sTitle": "App Path"
								},
								{
								"mData": "user",
								"sTitle": "User"
								},
								{
								"mData": "startTime",
								"sTitle": "Start Time"
								},{
								"mData": "date",
								"sTitle": "Date"
								},{
								"mData": "time",
								"sTitle": "Time"
								},
								{
								"mData": "status",
								"sTitle": "Status"
								}
								
								],
								"bRetrieve": true,
								"fnRowCallback": function(nRow, aData, iDisplayIndex) {
								   $(nRow).on("click", function(e){
									tbl_02_jobId = $('td:first',nRow).text();
									 create3rdTbl(this);
								   });
								   
								   var statusText = $('td:eq(8)',nRow).text();
									if(statusText == "Partial"){
										$('td:eq(8)',nRow).addClass('partial');
										$('td:eq(8)',nRow).text('');
									}else if(statusText == "Success"){
										$('td:eq(8)',nRow).addClass('pass');
										$('td:eq(8)',nRow).text('');
									}else if(statusText == "Fail"){
										$('td:eq(8)',nRow).addClass('fail');
										$('td:eq(8)',nRow).text('');
									}
								}
							});
							
							/*select table row
							*******************************************/
							$('#level_2tbl tbody').on( 'click', 'tr', function () {
								if ( $(this).hasClass('selected') ) {
									$(this).removeClass('selected');
									
								}
								else {
									table2nd.$('tr.selected').removeClass('selected');
									$(this).addClass('selected');
								}
							} );
							
							$('#level_2tbl').removeClass().addClass('level_2Tbl_new');
							
							$('#level_2tbl').addClass('oparation_ready')
							$('#level_2tbl_info').remove();
							$('#level_2tbl thead tr th').css({'background-color':'#95aac2', 'color':'#fff'})
							
							},
							error: function(){
							  alert('failed 2nd LVL TBL');
							 }
						});
						
		}	//end 2nd level table

/*file copy 3rd level table
**********************************/
create3rdTbl = function(dest, filecopy_date){
			$('#level_holder-3').remove();
			$('<tr id=\"level_holder-3\" class=\"\" style=\"width:99%;\">'+
			'<td id=\"level-3After\" colspan=\"10\" style=\"padding-bottom:20px; background-color:#A08292;\">'+
			'<span id=\"lvl3_header\" style="margin-left:5px; font-size:1.3em; color:#FFF;">All Job From Id:'+tbl_02_jobId+'</span>'+'<br/>'+
			'<table id=\"level_3tbl\" class=\"\" width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >'+
			'<thead>'+
			'<tr style=\"font-size:1em;\">'+
			'<th width=\"10%\">'+"ID"+'</th>'+
			'<th width=\"10%\">'+"Process Id"+'</th>'+
			'<th width=\"10%\">'+"Name"+'</th>'+
			'<th width=\"10%\">'+"Message"+'</th>'+
			'<th width=\"10%\">'+"App Path"+'</th>'+
			'<th width=\"10%\">'+"User"+'</th>'+
			'<th width=\"10%\">'+"Start Time"+'</th>'+
			'<th width=\"10%\">'+"Date"+'</th>'+
			'<th width=\"10%\">'+"Time"+'</th>'+
			'<th width=\"10%\">'+"Status"+'</th>'+
			'</tr>'+
			'</thed>'+
			'<tbody style=\"font-size:1.1em;\">'+
			'</tbody>'+
			'</table>'+
			'</td>'+
			'</tr>').insertAfter(dest);
			
			var file3TblData = {jobType:'File', dateValue:'', statusValue:'', jobId:tbl_02_jobId};
			var fileTbl3Data = JSON.stringify(file3TblData);
			
				$.ajax({
				url: AppConfigs.baseUrl+'/dashboarddetails',
				dataType:'json',
				type:'POST',
				timeout:6000,
				data:fileTbl3Data,
				success:function(data, msg){
					$('#level_3tbl').dataTable({
									"bPaginate": false,
									"bSort": false,
									"bFilter": false,
									"bProcessing": true,
									"bScrollCollapse": false,
									
									"aaData": data,
									"processing": true,
									"columnDefs":[
									{
										"targets": [ 1 ],
										"visible": false,
										"searchable": false
									}
									],
									"aoColumns":[
									{
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "processId",
									"sTitle": "Process Id"
									},{
									"mData": "name",
									"sTitle": "Name"
									},
									{
									"mData": "message",
									"sTitle": "Message"
									},
									{
									"mData": "appPath",
									"sTitle": "App Path"
									},
									{
									"mData": "user",
									"sTitle": "User"
									},
									{
									"mData": "startTime",
									"sTitle": "Start Time"
									},
									{
									"mData": "date",
									"sTitle": "Date"
									},{
									"mData": "time",
									"sTitle": "Time"
									},
									{
									"mData": "status",
									"sTitle": "Status"
									}
									
									],
									"bRetrieve": true,
									"fnRowCallback": function(nRow, aData, iDisplayIndex) {
									   var statusText = $('td:eq(8)',nRow).text();
										if(statusText == "Partial"){
											$('td:eq(8)',nRow).addClass('partial');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Success"){
											$('td:eq(8)',nRow).addClass('pass');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Fail"){
											$('td:eq(8)',nRow).addClass('fail');
											$('td:eq(8)',nRow).text('');
										}
									}
									
								});
								
								$('#level_3tbl').removeClass().addClass('level_3Tbl_new');
								$('#level_3tbl').addClass('oparation_ready')
								$('#level_3tbl_info').remove();
								$('#level_3tbl thead tr th').css({'background-color':'#c9b7c1', 'color':'#000'})
				},
				error: function(){
					alert('failed 3rd LVL TBL');
				}
				
				});
				
				
			}	//end 3rd level table
			
/*for db copy table details
*******************************************************/

/*db copy 1st level table
*****************************************/
trackDbStatus = function(data){
					   $('#dbcopy_statistic_tbl').dataTable().fnDestroy();
					   
					    var dbList = $('#dbcopy_statistic_tbl').dataTable({
									
									"bPaginate": true,
									"bSort": true,
									"bFilter": true,
									"bProcessing": true,
									"bScrollCollapse": true,
									"aLengthMenu": [[10,15,20],[10,15,20]],
									"aaData": data,
									"processing": true,
									"columnDefs":[
									{
										"targets": [ 1 ],
										"visible": false,
										"searchable": false
									}
									],
									"aoColumns":[
									{
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "processId",
									"sTitle": "Process Id"
									},{
									"mData": "name",
									"sTitle": "Name"
									},
									{
									"mData": "message",
									"sTitle": "Message"
									},
									{
									"mData": "appPath",
									"sTitle": "App Path"
									},
									{
									"mData": "user",
									"sTitle": "User"
									},
									{
									"mData": "startTime",
									"sTitle": "Start Time"
									},
									{
									"mData": "date",
									"sTitle": "Date"
									},{
									"mData": "time",
									"sTitle": "Time"
									},{
									"mData": "status",
									"sTitle": "Status"
									},
									],
									"fnCreatedRow": function( nRow, aData, iDataIndex ) {
										//var rowId = $('tbody tr').length;
										$(nRow).attr('id', 'row'+iDataIndex);
									},
									"bRetrieve": true,
									"fnRowCallback": function(nRow, aData,  iDataIndex) {
									/*job status colour
									****************************/
									   var statusText = $('td:eq(8)',nRow).text();
									   //alert(statusText)
										if(statusText == "Partial"){
											$('td:eq(8)',nRow).addClass('partial');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Success"){
											$('td:eq(8)',nRow).addClass('pass');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Fail"){
											$('td:eq(8)',nRow).addClass('fail');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "FileNotAvailable"){
											$('td:eq(8)',nRow).text('File Not Available');
										}else if(statusText == "SourceNotExist"){
											$('td:eq(8)',nRow).text('Source Not Exist');
										}
										/*create 2nd level table
										****************************/
									   $(nRow).on("click", function(e){
									   lvl_01_dbjobId = $('td:first',nRow).text();
									   
									   createDbCopy2ndTabl(this);	//global function for creating table (apps.js)
									   });
									   
										$('#dbcopy_statistic_tbl_filter label input').css({'margin-bottom':'10px','border':'1px solid #e20047'});
										$('#dbcopy_statistic_tbl_length label select').css({'border':'1px solid #e20047'});
									}
									
							});
							$("body").css("overflow-x", "hidden");
							dbList.fnDraw();
							/*select table row
							*******************************************/
							$('#dbcopy_statistic_tbl tbody').on( 'click', 'tr', function () {
								if ( $(this).hasClass('selected') ) {
									$(this).removeClass('selected');
								}
								else {
									dbList.$('tr.selected').removeClass('selected');
									$(this).addClass('selected');
								}
							} );
					 
			
		}	//end 1st level table
/*db copy 2nd level table
******************************************/
createDbCopy2ndTabl = function(dest, dbcopy_date){
						
						$('#level_db_holder-2').remove();
						$('<tr id=\"level_db_holder-2\" class=\"\">'+
						'<td id=\"level-db_2After\" colspan=\"9\" style=\"padding-bottom:20px; background-color:#6A83A0;\">'+
						'<span style="margin-left:5px; font-size:1.3em; color:#FFF;">All Job from Id:'+lvl_01_jobId+'</span>'+'<br/>'+
						'<table id=\"level_2dbtbl\" class=\"\" width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >'+
						'<thead>'+
						'<tr style=\"font-size:1.1em; height:18px;\">'+
						'<th width=\"10%\">'+"Id"+'</th>'+
						'<th width=\"10%\">'+"Process Id"+'</th>'+
						'<th width=\"10%\">'+"Name"+'</th>'+
						'<th width=\"10%\">'+"Message"+'</th>'+
						'<th width=\"10%\">'+"App Path"+'</th>'+
						'<th width=\"10%\">'+"User"+'</th>'+
						'<th width=\"10%\">'+"Start Time"+'</th>'+
						'<th width=\"10%\">'+"Date"+'</th>'+
						'<th width=\"10%\">'+"Time"+'</th>'+
						'<th width=\"10%\">'+"Status"+'</th>'+
						'</tr>'+
						'</thed>'+
						'<tbody style=\"font-size:1.1em; height:18px;\">'+
						'</tbody>'+
						'</table>'+
						'</td>'+
						'</tr>').insertAfter(dest);
						
						
						var db2Tbldata = {jobType:'DB', dateValue:'', statusValue:'', jobId:lvl_01_dbjobId};
						var dbTbl2Data = JSON.stringify(db2Tbldata);
						
						$.ajax({
							url: AppConfigs.baseUrl+'/dashboarddetails',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:dbTbl2Data,
							success:function(data, msg){
							var dbtable2nd = $('#level_2dbtbl').dataTable({
								"bPaginate": false,
								"bSort": false,
								"bFilter": false,
								"bProcessing": true,
								"bScrollCollapse": false,
								"aaData": data,
								"processing": true,
								"columnDefs":[
								{
									"targets": [ 1 ],
									"visible": false,
									"searchable": false
								}
								],
								"aoColumns":[
								{
								"mData":"id",
								"sTitle": "Id"
								},{
								"mData": "processId",
								"sTitle": "Process Id"
								},{
								"mData": "name",
								"sTitle": "Name"
								},
								{
								"mData": "message",
								"sTitle": "Message"
								},
								{
								"mData": "appPath",
								"sTitle": "App Path"
								},
								{
								"mData": "user",
								"sTitle": "User"
								},
								{
								"mData": "startTime",
								"sTitle": "Start Time"
								},{
								"mData": "date",
								"sTitle": "Date"
								},{
								"mData": "time",
								"sTitle": "Time"
								},
								{
								"mData": "status",
								"sTitle": "Status"
								}
								
								],
								"bRetrieve": true,
								"fnRowCallback": function(nRow, aData, iDisplayIndex) {
								   $(nRow).on("click", function(e){
									tbl_02_dbjobId = $('td:first',nRow).text();
									 create3rdDbTbl(this);
								   });
								   
								   var statusText = $('td:eq(8)',nRow).text();
									if(statusText == "Partial"){
										$('td:eq(8)',nRow).addClass('partial');
										$('td:eq(8)',nRow).text('');
									}else if(statusText == "Success"){
										$('td:eq(8)',nRow).addClass('pass');
										$('td:eq(8)',nRow).text('');
									}else if(statusText == "Fail"){
										$('td:eq(8)',nRow).addClass('fail');
										$('td:eq(8)',nRow).text('');
									}
								}
							});
							
							/*select table row
							*******************************************/
							$('#level_2dbtbl tbody').on( 'click', 'tr', function () {
								if ( $(this).hasClass('selected') ) {
									$(this).removeClass('selected');
								}
								else {
									dbtable2nd.$('tr.selected').removeClass('selected');
									$(this).addClass('selected');
								}
							} );
							
							$('#level_2dbtbl').removeClass().addClass('level_2Tbl_new');
							
							$('#level_2dbtbl').addClass('oparation_ready')
							$('#level_2dbtbl_info').remove();
							$('#level_2dbtbl thead tr th').css({'background-color':'#95aac2', 'color':'#fff'})
							
							},
							error: function(){
							  alert('failed 2nd LVL TBL');
							 }
						});
						
		}	//end 2nd level table

/*db copy 3rd level table
**************************************/
create3rdDbTbl = function(dest, dbcopy_date){
			$('#level_db_holder-3').remove();
			$('<tr id=\"level_db_holder-3\" class=\"\" style=\"width:99%;\">'+
			'<td id=\"level-db_3After\" colspan=\"10\" style=\"padding-bottom:20px; background-color:#A08292;\">'+
			'<span id=\"lvl3_header\" style="margin-left:5px; font-size:1.3em; color:#FFF;">All Job From Id:'+tbl_02_jobId+'</span>'+'<br/>'+
			'<table id=\"level_3dbtbl\" class=\"\" width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" >'+
			'<thead>'+
			'<tr style=\"font-size:1em;\">'+
			'<th width=\"10%\">'+"ID"+'</th>'+
			'<th width=\"10%\">'+"Process Id"+'</th>'+
			'<th width=\"10%\">'+"Name"+'</th>'+
			'<th width=\"10%\">'+"Message"+'</th>'+
			'<th width=\"10%\">'+"App Path"+'</th>'+
			'<th width=\"10%\">'+"User"+'</th>'+
			'<th width=\"10%\">'+"Start Time"+'</th>'+
			'<th width=\"10%\">'+"Date"+'</th>'+
			'<th width=\"10%\">'+"Time"+'</th>'+
			'<th width=\"10%\">'+"Status"+'</th>'+
			'</tr>'+
			'</thed>'+
			'<tbody style=\"font-size:1.1em;\">'+
			'</tbody>'+
			'</table>'+
			'</td>'+
			'</tr>').insertAfter(dest);
			
			var db3Tbldata = {jobType:'DB', dateValue:'', statusValue:'', jobId:tbl_02_dbjobId};
			var dbTblData = JSON.stringify(db3Tbldata);
				$.ajax({
				url: AppConfigs.baseUrl+'/dashboarddetails',
				dataType:'json',
				type:'POST',
				timeout:6000,
				data:dbTblData,
				success:function(data, msg){
					$('#level_3dbtbl').dataTable({
									"bPaginate": false,
									"bSort": false,
									"bFilter": false,
									"bProcessing": true,
									"bScrollCollapse": false,
									
									"aaData": data,
									"processing": true,
									"columnDefs":[
									{
										"targets": [ 1 ],
										"visible": false,
										"searchable": false
									}
									],
									"aoColumns":[
									{
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "processId",
									"sTitle": "Process Id"
									},{
									"mData": "name",
									"sTitle": "Name"
									},
									{
									"mData": "message",
									"sTitle": "Message"
									},
									{
									"mData": "appPath",
									"sTitle": "App Path"
									},
									{
									"mData": "user",
									"sTitle": "User"
									},
									{
									"mData": "startTime",
									"sTitle": "Start Time"
									},
									{
									"mData": "date",
									"sTitle": "Date"
									},{
									"mData": "time",
									"sTitle": "Time"
									},
									{
									"mData": "status",
									"sTitle": "Status"
									}
									
									],
									"bRetrieve": true,
									"fnRowCallback": function(nRow, aData, iDisplayIndex) {
									   var statusText = $('td:eq(8)',nRow).text();
										if(statusText == "Partial"){
											$('td:eq(8)',nRow).addClass('partial');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Success"){
											$('td:eq(8)',nRow).addClass('pass');
											$('td:eq(8)',nRow).text('');
										}else if(statusText == "Fail"){
											$('td:eq(8)',nRow).addClass('fail');
											$('td:eq(8)',nRow).text('');
										}
									}
									
								});
								
								$('#level_3dbtbl').removeClass().addClass('level_3Tbl_new');
								$('#level_3dbtbl').addClass('oparation_ready')
								$('#level_3dbtbl_info').remove();
								$('#level_3dbtbl thead tr th').css({'background-color':'#c9b7c1', 'color':'#000'})
				},
				error: function(){
					alert('failed 3rd LVL TBL');
				}
				
				});
				
				
			}	//end 3rd level table
			
/*menu item OPERATIONAL DASHBOARD, view: ops_dashboard_view.js
****************************************************************/

/*job count by hour
********************************************/
chartConfig = function(data){
						$('#chart1 svg').empty();
						var jobName = ["File copy", "DB Copy", "File Copy from FTP"];
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
						
						function jobByHourConfig(containerId, data, chartOptions) {
						  nv.addGraph(function() {
							  var chart;
							  chart = nv.models.multiBarChart()
								.margin({bottom: 200})
								.transitionDuration(30)
								;

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
}	//end job count by hour

/*status by hour
***************************************/
statusByHour = function(data){
				$('#chart2 svg').empty();
						var jobName = ["Success", "Fail", "Partial"];
						
						function jobStatus(data) {
						   return new d3.range(0,data.length).map(function(d,i) { return {
							key: data[i].status,//jobName[i],
							values: new d3.range(0,data[i].cData.length).map( function(f,j) {
							  return { 
									   y: data[i].cData[j].count, //10 + Math.random()*100,
									   x: j
									 }
							})
							};  
						  });
						}
						
						statusByHourConfig("chart2", jobStatus(data), {
						  delay: 0,
						  transitionDuration:0,
						  groupSpacing: 0.2,
						  showLegend: true
						});
						
						var color = ["#0fbd23", "#f05a1f", "#f0b11f"];
						d3.scale.color = function() {
							return d3.scale.ordinal().range(color);
						};
						
						function statusByHourConfig(containerId, data, chartOptions) {
						  nv.addGraph(function() {
							  var chart;
							  chart = nv.models.multiBarChart()
								.margin({bottom: 39})
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
					
}	//end status by hour

/*status details by hour
***************************************/
statusTbl = function(data){
				var statDetailsTbl = $('#jobCount_date').dataTable({
					"bPaginate": false,
					"bSort": false,
					"bFilter": false,
					"bProcessing": true,
					"bScrollCollapse": true,
					"aLengthMenu": [[10,15,20],[10,15,20]],
					"aaData": data,
					"processing": true,
					"aoColumns":[
						{
							"mData":"job_type",
							"sTitle": "Job Type"
						},
						{
							"mData": "today_pass",
							"sTitle": "Success"
						},
						{
							"mData": "today_fail",
							"sTitle": "Failure"
						},
						{
							"mData": "today_partial",
							"sTitle": "Partial"
						},
						{
							"mData": "last_7days_pass",
							"sTitle": "Success"
						},
						{
							"mData": "last_7days_fail",
							"sTitle": "Failure"
						},
						{
							"mData": "last_7days_partial",
							"sTitle": "Partial"
						},
						{
							"mData": "last_30days_pass",
							"sTitle": "Success"
						},
						{
							"mData": "last_30days_fail",
							"sTitle": "Failure"
						},
						{
							"mData": "last_30days_partial",
							"sTitle": "Partial"}
					],
					"bRetrieve": true
				});
				statDetailsTbl.fnDraw();
				$('#jobCount_date_info').css('display','none');
				$('#jobCount_date').dataTable().fnDraw();
}	// end status details by hour

/*execution duration by job
**************************************************/
executionDuration = function(arg){
					$('#chart').empty();
					var margin = {top: 0, right: 0, bottom: 0, left: -15},
					width = 903- margin.left - margin.right,
					height = 144- margin.top - margin.bottom;

					var color = d3.scale.category20c();
					/*var color = ["#f05a1f", "#f0b11f", "#0fbd23"];
						d3.scale.color = function() {
							return d3.scale.ordinal().range(color);
						};*/
						
					var treemap = d3.layout.treemap()
						.size([width, height])
						.sticky(true)
						.value(function(d) { return d.size; });
					  
					var div = d3.select("#chart").append("div")
						.style("position", "relative")
						.style("width", (width + margin.left + margin.right) + "px")
						.style("height", (height + margin.top + margin.bottom) + "px")
						.style("left", margin.left + "px")
						.style("top", margin.top + "px")
						
					  var node = div.datum(arg).selectAll(".node")
					    .data(treemap.nodes)
						.enter().append("span")
						.attr("class", "node")
						.call(position)
						.style("background", function(d) { return d.children ? color(d.size) : color(d.size); })
						.text(function(d) { return d.children ? null :d.size+"**"; })
						.attr("title", function(d){ 
						return  d.children ? null :'<b>'+"Job Name:"+'</b>'+'<br/>'+d.name; 
						})
					
					function position() {
					  this.style("left", function(d) { return d.x + "px"; })
						  .style("top", function(d) { return d.y + "px"; })
						  .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
						  .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
				}
				
		}	//end execution duration
		
/*menu item OPERATIONAL DASHBOARD, view: lineage_dashboard_view.js
****************************************************************/

/*bubble chart small view
***********************************************/
createOjectTransfer = function(){

	var diameter = 420,
	 
    format = d3.format(",d"),
    color = d3.scale.category20c();

	var bubble = d3.layout.pack()
		.sort(null)
		.size([diameter, diameter])
		.padding(5);
		

	var svg = d3.select("#bubble_chart2").append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble")
		.attr("id", "bubble_container")
		.attr("align", "right");

	d3.json("json/flare.json", function(error, root) {
	  var node = svg.selectAll(".node")
		  .data(bubble.nodes(classes(root))
		  .filter(function(d) { return !d.children; }))
		.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	  node.append("title")
		  .text(function(d) { return d.className + ": " + format(d.value); });

	  node.append("circle")
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return color(d.packageName); });

	  node.append("text")
		  .attr("dy", ".3em")
		  .style("text-anchor", "middle")
		  .text(function(d) { return d.className.substring(0, d.r / 3); });
	});

	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
	  var classes = [];

	  function recurse(name, node) {
		if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
		else classes.push({packageName: name, className: node.name, value: node.size});
	  }

	  recurse(null, root);
	  return {children: classes};
	}

	d3.select(self.frameElement).style("height", diameter + "px");
}	// end bubble small

/*bubble chart zoom view
*************************************************/
OjectTransferZoom = function(){
	$('#zoom_row').css({'visibility':'visible','display':'block'});
	var diameter = 740,
	 
    format = d3.format(",d"),
    color = d3.scale.category20c();

	var bubble = d3.layout.pack()
		.sort(null)
		.size([diameter, diameter])
		.padding(1.5);
		

	var svg = d3.select("#zoom_bubble").append("svg")
		.attr("width", diameter)
		.attr("height", diameter)
		.attr("class", "bubble")
		.attr("id", "bubble_container")
		.attr("align", "right");

	d3.json("json/flare.json", function(error, root) {
	  var node = svg.selectAll(".node")
		  .data(bubble.nodes(classes(root))
		  .filter(function(d) { return !d.children; }))
		.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	  node.append("title")
		  .text(function(d) { return d.className + ": " + format(d.value); });

	  node.append("circle")
		  .attr("r", function(d) { return d.r; })
		  .style("fill", function(d) { return color(d.packageName); });

	  node.append("text")
		  .attr("dy", ".3em")
		  .style("text-anchor", "middle")
		  .text(function(d) { return d.className.substring(0, d.r / 3); });
	});

	// Returns a flattened hierarchy containing all leaf nodes under the root.
	function classes(root) {
	  var classes = [];

	  function recurse(name, node) {
		if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
		else classes.push({packageName: name, className: node.name, value: node.size});
	  }

	  recurse(null, root);
	  return {children: classes};
	}

	d3.select(self.frameElement).style("height", diameter + "px");
}