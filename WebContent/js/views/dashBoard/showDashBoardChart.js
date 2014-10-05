define([
    'jquery', 
	'underscore', 
	'backbone', 
 	'text!../templates/dashBoard/dash_Board.html', 
	'DashBoardModel',
	'DashBoardCollection',
	'datatables',
	'app_script',
	'applicationjs'
], function ($, _, Backbone, tpl, DashBoardModel, DashBoardCollection) {
    var DashBoardView;
    //console.log(FileCopyModel.toJSON());
	
    DashBoardView = Backbone.View.extend({
		el : 'div#screen_content',
		
		initialize: function () {
			this.template = _.template(tpl);
			this.dashdoardCollection = new DashBoardCollection();
        },
		events : {
		'change input#fileCopy_date_field' : 'changeDate',
		'change input#dbCopy_date_field' : 'changeDbcopyDate',
		'change select#fileCopy_status_option' : 'changeStatus',
		'change select#dbCopy_status_option' : 'changedbCopyStatus',
		'click a#file_copy_list' : 'show_filecopy',
		'click a#db_copy_list': 'show_dbcopy'
		},
		show_filecopy : function(){
			$('#dbCopy_holder').removeClass('show').addClass('hide');
			$('#fileCopy_holder').removeClass('hide').addClass('show')
			$('#file_copy').removeClass('hide').addClass('show');
			$('#db_copy').removeClass('show').addClass('hide');
		},
		show_dbcopy : function(){
			$('#fileCopy_holder').removeClass('show').addClass('hide');
			$('#dbCopy_holder').removeClass('hide').addClass('show')
			$('#db_copy').removeClass('hide').addClass('show');
			$('#file_copy').removeClass('show').addClass('hide');
				
					
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
						
					
					/*file copy date
					************************************/
					$('#fileCopy_date_field').val(currentDate);
					$('#fileCopy_date_field').css({'padding-left':'5px'});
					$('#fileCopy_date_field').datepicker();
					
					var filecopy_current_date = $('#fileCopy_date_field').val().split('/');
					var filecopy_date = filecopy_current_date[2]+filecopy_current_date[0]+filecopy_current_date[1];
					
					var status_selection = $("select#fileCopy_status_option option:selected").text();
					
					var fileStatData = {jobType:'File', dateValue:filecopy_date, status:status_selection, jobId:''};
					var fStatData = JSON.stringify(fileStatData);
					
					//if($('#fileCopy_status_option option:selected').text() == 'Failed'){
						$.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						 dataType:'json',
						 type:'POST',
						 timeout:6000,
						 data:fStatData,
						 success:function(data, msg){
						  trackStatus(data);
						  console.log(status_selection);
						 },
						 error: function(err){
							console.log("File copy Link not found");
						 }
							
						});
					//}
					
					/*db copy date
					******************************************************/
					$('#dbCopy_date_field').val(currentDate);
					$('#dbCopy_date_field').css({'padding-left':'5px'});
					$('#dbCopy_date_field').datepicker();
					
					var dbcopy_current_date = $('#dbCopy_date_field').val().split('/');
					var dbcopy_date = dbcopy_current_date[2]+dbcopy_current_date[0]+dbcopy_current_date[1];
					
					var dbCopy_status_selection = $("select#dbCopy_status_option option:selected").text();
					
					var dbStatData = {jobType:'DB', dateValue:dbcopy_date, status:dbCopy_status_selection, jobId:''};
					var dbCopStatData = JSON.stringify(dbStatData);
					
					//if($('#dbCopy_status_option option:selected').text() == 'Failed'){
						$.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:dbCopStatData,
						success:function(data, msg){
						  trackDbStatus(data);
						 },
						 error: function(err){
							console.log("db copy Link not found");
						 }
							
						});
					//}
		},
		
		changeDate : function(filecopy_date){
			var fc_change_dt = $('#fileCopy_date_field').val().split('/');
			var fc_dt = fc_change_dt[2]+fc_change_dt[0]+fc_change_dt[1];
			
			var status_selection = $("select#fileCopy_status_option option:selected").text();
			
			var chnageDtFileData = {jobType:'File', dateValue:fc_dt, status:status_selection, jobId:''};
			var chDtFileData = JSON.stringify(chnageDtFileData);
					if(filecopy_date != fc_dt && status_selection != ''){
						$.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						 dataType:'json',
						 type:'POST',
						 timeout:6000,
						 data:chDtFileData,
						 success:function(data, msg){
						  trackStatus(data);
						  console.log(status_selection);
						 },
						 error: function(err){
							console.log("File copy Link not found");
						 }
							
						});
					}
		},
		
		changeDbcopyDate : function(dbcopy_date){
			var dbcopy_change_date = $('#dbCopy_date_field').val().split('/');
			var dbcopy_dt = dbcopy_change_date[2]+dbcopy_change_date[0]+dbcopy_change_date[1];
			
			var dbCopy_status_selection = $("select#dbCopy_status_option option:selected").text();
			
			var chnageDtDbData = {jobType:'DB', dateValue:dbcopy_dt, status:dbCopy_status_selection, jobId:''};
			var chDtDbData = JSON.stringify(chnageDtDbData);
			
				if(dbcopy_date != dbcopy_dt && dbCopy_status_selection != ''){
						this.getDataFromServer(chDtDbData);
				}
		},
		getDataFromServer : function(arg){
		  $.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:arg,
						success:function(data, msg){
						  trackDbStatus(data);
						 },
						 error: function(err){
							console.log("db copy Link not found");
						 }
							
						});
		
		},
		changeStatus: function(fCopyDt){
			var filecopy_current_date;
			var filecopy_date;
			if(typeof fCopyDt == 'object'){
				filecopy_current_date = $('#fileCopy_date_field').val().split('/');
				filecopy_date = filecopy_current_date[2]+filecopy_current_date[0]+filecopy_current_date[1];
			}
			
			
			var status_selection = $("select#fileCopy_status_option option:selected").text();
			
			var fileStatData = {jobType:'File', dateValue:filecopy_date, status:status_selection, jobId:''};
			var fStatData = JSON.stringify(fileStatData);
			
			if($('select#fileCopy_status_option option:selected').text() != ''){
						$.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:fStatData,
						success:function(data, msg){
							trackStatus(data);
						console.log(status_selection);
						},
						error: function(err){
							console.log("File copy Link not found");
						 }
							
						});
					};
					
		},
		changedbCopyStatus : function(dbcopyDt){
		var dbcopy_current_date;
		var dbcopy_date;
		if(typeof dbcopyDt == 'object'){
				dbcopy_current_date = $('#dbCopy_date_field').val().split('/');
				dbcopy_date = dbcopy_current_date[2]+dbcopy_current_date[0]+dbcopy_current_date[1];
			}
			
			var dbCopy_status_selection = $("select#dbCopy_status_option option:selected").text();
			
			var dbStatData = {jobType:'DB', dateValue:dbcopy_date, status:dbCopy_status_selection, jobId:''};
			var dbCopStatData = JSON.stringify(dbStatData);
			trackDbStatus(Data);
						$.ajax({
						url: AppConfigs.baseUrl+'/dashboarddetails',
						dataType:'json',
						type:'POST',
						timeout:6000,
						data:dbCopStatData,
						success:function(data, msg){
						  trackDbStatus(Data);
						 },
						 error: function(err){
							console.log("db copy Link not found");
						 }
							
						});
					//};
			
		}
		,
	
	close : function(){
		 $(this.el).empty();
		 $(this.el).unbind();
		
		}
    });

    return DashBoardView;
});