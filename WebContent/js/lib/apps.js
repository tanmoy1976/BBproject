//configuration Manager
//HCL TECHNOLOGY 2014
	
$(document).ready(function(){
		
		$('#screen_content').load("../templates/fileCopy/fileCopy.html", function(event){
			//file copy configuration list
			var fileCopyList = $('#file_config_tbl').dataTable({
				"bPaging":   false,
				"ordering": false,
				"bSort" : false,
				"bFilter":false,
				"aaData": [
					
				],
				"aoColumns":
				[
					{ "mData": "Source Path" },
					{ "mData": "Destination Path" },
					{ "mData": "Saved" },
					{ "mData": "Generated"},
					{ "mData": "Edit"},
					{ "mData": "Delete"}
				]
			});
			event.preventDefault();
		});
	
	
	//global events
	/*collapseMenu = function(){
		//collapse configuration
		$('#function_btn_holder').removeClass().addClass('config_accord_hide');
		$('#config_button').removeClass('ui-state-default-active').addClass('ui-state-default');
		$('#config_button span').removeClass().addClass('glyphicon glyphicon-plus-sign');
		//collapse Ops. dashboard
		$('#ops_dashboard').removeClass().addClass('dashboard_accord_hide');
		$('#ops_dashboard_button').removeClass('ui-state-default-active').addClass('ui-state-default');
		$('#ops_dashboard_button span').removeClass().addClass('glyphicon glyphicon-plus-sign');
		//collapse Ops. LOG
		$('#log_button').removeClass('ui-state-default-active').addClass('ui-state-default');
	}*/
	
	/*config_subMenuClose = function(){
		$('#open_fileCopy').removeClass('ui-state-default-active').addClass('ui-state-default');
		$('#open_dbCopy').removeClass('ui-state-default-active').addClass('ui-state-default');
	}*/
	//file copy configuration events
	/*$('#config_button').click(function(){
		if($('#function_btn_holder').hasClass('config_accord_block')){
			$('#function_btn_holder').removeClass().addClass('config_accord_hide');
			$('#config_button').removeClass('ui-state-default-active').addClass('ui-state-default');
			$('#config_button span').removeClass().addClass('glyphicon glyphicon-plus-sign');
		}else{
			collapseMenu();
			$('#config_button').removeClass('ui-state-default').addClass('ui-state-default-active');
			$('#function_btn_holder').removeClass().addClass('config_accord_block');
			$('#config_button span').removeClass().addClass('glyphicon glyphicon-minus-sign');
		}
	});*/
	
	$('#open_fileCopy').click(function(){
		$('#screen_content').load("../templates/fileCopy/fileCopy.html", function(e){
			//config_subMenuClose();
			$('#config_button').removeClass('ui-state-default').addClass('ui-state-default-active');
			$('#open_fileCopy').removeClass('ui-state-default').addClass('ui-state-default-active');
			
			//file copy configuration list
			var fileCopyList = $('#file_config_tbl').dataTable({
				"bPaging":   false,
				"ordering": false,
				"bSort" : false,
				"bFilter":false,
				"aaData": [
					
				],
				"aoColumns":
				[
					{ "mData": "Source Path" },
					{ "mData": "Destination Path" },
					{ "mData": "Saved" },
					{ "mData": "Generated"},
					{ "mData": "Edit"},
					{ "mData": "Delete"}
				]
			});
			e.preventDefult();
		});
	})
	
	//ops. dashboard events
	/*$('#ops_dashboard_button').click(function(){
		if($('#ops_dashboard').hasClass('dashboard_accord_block')){
			$('#ops_dashboard').removeClass().addClass('dashboard_accord_hide');
			$('#ops_dashboard_button').removeClass('ui-state-default-active').addClass('ui-state-default');
			$('#ops_dashboard_button span').removeClass().addClass('glyphicon glyphicon-plus-sign');
		}else{
			collapseMenu();
			$('#ops_dashboard').removeClass().addClass('dashboard_accord_block');
			$('#ops_dashboard_button').removeClass('ui-state-default').addClass('ui-state-default-active');
			$('#ops_dashboard_button span').removeClass().addClass('glyphicon glyphicon-minus-sign');
		}
	});*/
	
	$('#open_dbCopy').click(function(){
		$('#screen_content').load("../templates/dbCopy/dbCopy.html", function(e){
			//config_subMenuClose();
			$('#config_button').removeClass('ui-state-default').addClass('ui-state-default-active');
			$('#open_dbCopy').removeClass('ui-state-default').addClass('ui-state-default-active');
			//db copy configuration list
			var fileCopyList = $('#db_config_tbl').dataTable({
				"bPaging":   false,
				"ordering": false,
				"bSort" : false,
				"bFilter":false,
				"aaData": [
					
				],
				"aoColumns":
				[
					{ "mData": "Source Database Type" },
					{ "mData": "Database Name" },
					{ "mData" : "Table Name"},
					{ "mData": "Saved" },
					{ "mData": "Generated"},
					{ "mData": "Edit"},
					{ "mData": "Delete"}
				]
			});
			e.preventDefult();
		});
	});
	
	
});
