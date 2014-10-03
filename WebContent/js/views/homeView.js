define('HomeView', [
    'jquery', 'underscore', 'backbone', 'text!../templates/home.html', 'App', 'applicationjs'
], function ($, _, Backbone, tpl) {
    var HomeView;
    //console.log("view home")
    HomeView = Backbone.View.extend({
		el : 'body',
        initialize: function () {
		    console.log("view home initailize")
        },
		
		events :{
		//'change input#ops_date_field' : 'top3timeChangeDate'
		},
		
		top3Time : function(Home_dt){
				var d = new Date();
				var month = d.getMonth()+1;
				var day = d.getDate();

				var currentDate = 
					((''+month).length<2 ? '0' : '') + month + '/' +
					((''+day).length<2 ? '0' : '') + day +
					'/'+d.getFullYear();
				$('#home_date').val(currentDate);
				
				var homeDt = $('#home_date').val().split('/');
				var Home_dt = homeDt[2]+homeDt[0]+homeDt[1];
				var presentDate = $('#home_date').val()
				$('#currentDateTop').text(presentDate);
				$('#currentDateBottom').text(presentDate);
				
				
					/*top 3 time consuming job
					**************************************/
					var topTimeTblData = {jobType:'', dateValue:Home_dt, kpiType:'gettoptimeconsumingjob'};
					var topTblData = JSON.stringify(topTimeTblData);
							$.ajax({
								url: AppConfigs.baseUrl+'/gettoptimeconsumingjob',
								dataType:'json',
								type:'POST',
								timeout:6000,
								data:topTblData,
								success:function(data, msg){
								/*var that = this;	
									that.drawTopTable(data);*/
									var top3Tbl = $('#top_three').dataTable({
									
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
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "time",
									"sTitle": "Time*"
									},
									],
									"bRetrieve": true
							});
							$('#top_three_info').css('display','none');
								},
								error: function(err){
								
								}
							})
		},
		bottom3Time : function(Home_dt){
			/*bottom 3 time consuming job
			****************************************/
			var d = new Date();
				var month = d.getMonth()+1;
				var day = d.getDate();

				var currentDate = 
					((''+month).length<2 ? '0' : '') + month + '/' +
					((''+day).length<2 ? '0' : '') + day +
					'/'+d.getFullYear();
				$('#home_date').val(currentDate);
				
				var homeDt = $('#home_date').val().split('/');
				var Home_dt = homeDt[2]+homeDt[0]+homeDt[1];
			var bottomTimeTblData = {jobType:'', dateValue:Home_dt, kpiType:'getbottomtimeconsumingjob'};
			var bottomTblData = JSON.stringify(bottomTimeTblData);
					$.ajax({
								url: AppConfigs.baseUrl+'/getbottomtimeconsumingjob',
								dataType:'json',
								type:'POST',
								timeout:6000,
								data:bottomTblData,
								success:function(data, msg){
									var top3Tbl = $('#bottom_three').dataTable({
									
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
									"mData":"id",
									"sTitle": "Id"
									},{
									"mData": "time",
									"sTitle": "Time*"
									},
									],
									"bRetrieve": true
							});
							$('#bottom_three_info').css('display','none');
								},
								error: function(err){
								
								}
							});
					
		},
		
        render    : function (user,callback, Home_dt) {
		    this.template = _.template(tpl);
            console.log("view home render")
            $(this.el).html(this.template({username: AppConfigs.userName}));
			/*left panel top and bottom time consuming table
			*******************************************************/
			$("body").css("overflow-X", "hidden");
			var self = this;
				self.top3Time(Home_dt);
				self.bottom3Time(Home_dt);
			if(typeof callback != 'undefined'){
			     callback();
						
			}
        },
	
	close : function(){
		 $(this.el).empty();
		 $(this.el).unbind();
		
		}
    });

    return HomeView;
});