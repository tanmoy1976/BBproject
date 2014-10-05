define([
    'jquery', 
	'underscore', 
	'backbone', 
 	'text!../templates/dashBoard/count_dashboard.html', 
	'countDashBoardModel',
	'countDashBoardCollection',
	'datatables',
	'applicationjs',
	'd3andv3',
	'nvd3',
	'd3',
	'svgjs',
	'app_script',
	'heatmapjs',
	'jqtip'
	
], function ($, _, Backbone, tpl, countDashBoardModel, countDashBoardCollection) {
    var countDashBoardView;
    //console.log(FileCopyModel.toJSON());
	
    countDashBoardView = Backbone.View.extend({
		el : 'div#screen_content',
		
		initialize: function () {
			//this.template = _.template(tpl);
			this.COUNTdashdoardCollection = new countDashBoardCollection();
        },
		events : {
		'change input#ops_date_field' : 'changeDate',
		'change select#count_selection' : 'last_hour_count'//,
		//'change select#status_selection' : 'last_hour_status' //,
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
							//url: AppConfigs.baseUrl+'/getjobcountbyhour',
							url:'json/lastHour/count/all_count/jobCountByHr_all_count.json',
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
		
		
	
	close : function(){
		 $(this.el).empty();
		 $(this.el).unbind();
		
		}
		});
			return countDashBoardView;
});