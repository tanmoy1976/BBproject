define([
    'jquery', 
	'underscore', 
	'backbone', 
 	'text!../templates/dashBoard/count_dashboard.html', 
	'countDashBoardModel',
	'countDashBoardCollection',
	//'datatables',
	'applicationjs',
	'd3andv3',
	'nvd3',
	'd3',
	'svgjs',
	'app_script',
	'heatmapjs'/*,
	'jqtip'*/
	
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
		'change select#count_selection' : 'last_hour_count'
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
					$('#booking_date_field').val(currentDate);
					$('#booking_date_field').css({'padding-left':'5px'});
					$('#booking_date_field').datepicker();
					
					var current_date = $('#booking_date_field').val();
					alert($('#booking_date_field').val(currentDate))
					var current_date = $('#booking_date_field').val().split('/');
					var cdate = current_date[2]+current_date[0]+current_date[1]
					
					var presentDt = $('#booking_date_field').val();
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
		
		
		
		/*show count graph by hour
		*********************************/
		last_hour_count : function(adate){
		
		var selectedCount = $('select#count_selection option:selected').val();
		var current_date;
		var cdate;
		if(typeof adate == 'object'){
		current_date = $('#booking_date_field').val().split('/');
		cdate = current_date[2]+current_date[0]+current_date[1]
		}
			
			var changeCntData = {jobType:'', dateValue:cdate, hourValue:selectedCount, kpiType:'getjobcountbyhour'};
			var cCntData = JSON.stringify(changeCntData);
			if($('#count_selection option:selected').val() == "-1"){
						$.ajax({
							//url: AppConfigs.baseUrl+'/getjobcountbyhour',
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
							//url: AppConfigs.baseUrl+'/getjobcountbyhour',
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