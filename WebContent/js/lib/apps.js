//configuration Manager

	
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
	
	
	
	
	
	
	
	
	
	
	
});
