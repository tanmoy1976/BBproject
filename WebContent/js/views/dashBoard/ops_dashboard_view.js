define([
    'jquery', 
	'underscore', 
	'backbone', 
 	'text!../templates/dashBoard/ops_dashboard.html', 
	'opsDashBoardModel',
	'opsDashBoardCollection',
	'datatables',
	'applicationjs',
	'd3andv3',
	'nvd3',
	'd3',
	'svgjs',
	'app_script',
	'heatmapjs',
	'jqtip'
	
], function ($, _, Backbone, tpl, opsDashBoardModel, opsDashBoardCollection) {
    var opsDashBoardView;
    //console.log(FileCopyModel.toJSON());
	
    opsDashBoardView = Backbone.View.extend({
		el : 'div#screen_content',
		
		initialize: function () {
			//this.template = _.template(tpl);
			this.OPSdashdoardCollection = new opsDashBoardCollection();
        },
		events : {
		'change input#ops_date_field' : 'changeDate',
		'change select#count_selection' : 'last_hour_count',
		'change select#status_selection' : 'last_hour_status' //,
		//'mouseover #chart>div>span':'hitmapNameIn'
		},
		hitmapNameIn : function(e){
			 var fileID = $(e.target).val();
			 var dd = [];
			 dd.push(fileID)
			// alert(dd);
								
		},
        render : function (calback) {
				this.template = _.template(tpl);
				$(this.el).html(this.template());
				
				self = this;
					/*Get current date
					***************************************/
					var d = new Date();

					var month = d.getMonth()+1;
					var day = d.getDate();

					var currentDate = 
						((''+month).length<2 ? '0' : '') + month + '/' +
						((''+day).length<2 ? '0' : '') + day +
						'/'+d.getFullYear();
					$('#ops_date_field').val(currentDate);
					$('#ops_date_field').css({'padding-left':'5px'});
					$('#ops_date_field').datepicker();
					
					
					var current_date = $('#ops_date_field').val().split('/');
					var cdate = current_date[2]+current_date[0]+current_date[1]
					var presentDt = $('#ops_date_field').val()
					$('#currentJobStat').text(presentDt);
					
					$('#lastWeek').text(presentDt);
					$('#lastMonth').text(presentDt);
					
					/*call chart function
					**********************************/
					
					/*show count graph
					*********************************/
					var selectedCount = $('select#count_selection option:selected').val();
					var countData = {jobType:'', dateValue:cdate, hourValue:selectedCount, kpiType:'getjobcountbyhour'};
					var ctData = JSON.stringify(countData);
					if($('#count_selection option:selected').val() == "-1"){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobcountbyhour',
							//url:'json/lastHour/count/last_4hour/jobCountByHr_last_4_hours.json',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:ctData,
							success:function(data, msg){
								console.log(data, msg);
								chartConfig(data);
							},
							error: function(err){
								$('#chart2>svg').text("Database not connected.")
							}
						});
					}
					/*show status graph
					************************************/
					var selectedStatus = $('select#status_selection option:selected').val();
					var statusData = {jobType:'', dateValue:cdate, hourValue:selectedStatus, kpiType:'getjobstatusbyhourrange'};
					var stsData = JSON.stringify(statusData);
					if($('#status_selection option:selected').val() == "-1"){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobstatusbyhourrange',
							//url:'json/lastHour/status/all_status/jobStatusByHr_all_status.json',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:stsData,
							success:function(data, msg){
								statusByHour(data);
							},
							error: function(err){
							
							}
						});
					}
					/*show get cumulative job status
					***********************************************/
					var cumulativeStatusData = {jobType:'', dateValue:cdate, kpiType:'getcumulaticejobstatus'};
					var cStsData = JSON.stringify(cumulativeStatusData);
					$.ajax({
						url: AppConfigs.baseUrl+'/getcumulaticejobstatus',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:cStsData,
						success:function(data, msg){
							statusTbl(data);
						},
						error: function(err){
						
						}
					});
					
					/*show job size by hour heat-map
					**********************************************/
					var heatData = {jobType:'', dateValue:cdate, kpiType:'getjobsizebydate'};
					var htData = JSON.stringify(heatData);
					$.ajax({
						url: AppConfigs.baseUrl+'/getjobsizebydate',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:htData,
						success:function(data, msg){
							executionDuration(data); 
							$('[data-title!=""]').qtip();
							
						},
						error: function(err1, err2, err3){
						
						}
					});
					
					
		},
		
		changeDate : function(cdate){
			/*show count graph
			*********************************/
			var change_date = $('#ops_date_field').val().split('/');
			var changeDt = change_date[2]+change_date[0]+change_date[1]
			//alert(changeDt);
			var tblDt = $('#ops_date_field').val();
			
			$('#currentJobStat').text(tblDt);
			$('#lastWeek').text(tblDt);
			$('#lastMonth').text(tblDt);
			
			var selectedCount = $('select#count_selection option:selected').val();
			var changeCountData = {jobType:'', dateValue:changeDt, hourValue:selectedCount, kpiType:'getjobcountbyhour'};
			var ccData = JSON.stringify(changeCountData);
			if(cdate != changeDt && selectedCount != ""){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobcountbyhour',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:ccData,
							success:function(data, msg){
								chartConfig(data);
								
							},
							error: function(err){
							
							}
						});
					}
					
			/*show status graph
			************************************/
			var selectedStatus = $('select#status_selection option:selected').val();
			var changeStatusData = {jobType:'', dateValue:changeDt, hourValue:selectedStatus, kpiType:'getjobstatusbyhourrange'};
			var csData = JSON.stringify(changeStatusData);
			if(cdate != changeDt && selectedStatus != ""){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobstatusbyhourrange',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:csData,
							success:function(data, msg){
								statusByHour(data);
							},
							error: function(err){
							
							}
						});
					}
					
			/*show job size by hour heat-map
			**********************************************/
			var changeHeatData = {jobType:'', dateValue:changeDt,  kpiType:'getjobsizebydate'};
			var chData = JSON.stringify(changeHeatData);
			if(cdate != changeDt){
					$.ajax({
						url: AppConfigs.baseUrl+'/getjobsizebydate',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:chData,
						success:function(data, msg){
							executionDuration(data); 
							$('[data-title!=""]').qtip();
						},
						error: function(err){
						
						}
					});
			}
		  
		  /*show get cumulative job status
		  ***********************************************/
		  var changeCumuStatusData = {jobType:'', dateValue:changeDt, kpiType:'getcumulaticejobstatus'};
		  var ccStsData = JSON.stringify(changeCumuStatusData);
				if(cdate != changeDt){
					$.ajax({
						url: AppConfigs.baseUrl+'/getcumulaticejobstatus',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:ccStsData,
						success:function(data, msg){
							statusTbl(data);
						},
						error: function(err){
						
						}
					});
				}
		
		},
		
		/*show count graph by hour
		*********************************/
		last_hour_count : function(adate){
		
		var selectedCount = $('select#count_selection option:selected').val();
		var current_date;
		var cdate;
		if(typeof adate == 'object'){
		current_date = $('#ops_date_field').val().split('/');
		cdate = current_date[2]+current_date[0]+current_date[1]
		}
			
			var changeCntData = {jobType:'', dateValue:cdate, hourValue:selectedCount, kpiType:'getjobcountbyhour'};
			var cCntData = JSON.stringify(changeCntData);
			if($('#count_selection option:selected').val() == "-1"){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobcountbyhour',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:cCntData,
							success:function(data, msg){
								chartConfig(data);
							},
							error: function(err){
							
							}
						});
					}else{
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobcountbyhour',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:cCntData,
							success:function(data, msg){
								chartConfig(data);
							},
							error: function(err){
							
							}
						});
					}
			
		},
		
		/*show status graph by hour
		************************************/
		last_hour_status : function(adate){
		var selectedStatus = $('select#status_selection option:selected').val();
		var current_date;
		var cdate;
		if(typeof adate == 'object'){
		current_date = $('#ops_date_field').val().split('/');
		cdate = current_date[2]+current_date[0]+current_date[1]
		}
		
		var changeStatData = {jobType:'', dateValue:cdate, hourValue:selectedStatus, kpiType:'getjobstatusbyhourrange'};
		var cStatData = JSON.stringify(changeStatData);
		if($('#status_selection option:selected').val() == "-1"){
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobstatusbyhourrange',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:cStatData,
							success:function(data, msg){
								statusByHour(data);
							},
							error: function(err){
							
							}
						});
					}else{
						$.ajax({
							url: AppConfigs.baseUrl+'/getjobstatusbyhourrange',
							dataType:'json',
							type:'POST',
							timeout:6000,
							data:cStatData,
							success:function(data, msg){
								statusByHour(data);
							},
							error: function(err){
							
							}
						});
					}
		
		},
	
	close : function(){
		 $(this.el).empty();
		 $(this.el).unbind();
		
		}
		});
			return opsDashBoardView;
});