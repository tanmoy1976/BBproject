define("Router", [
    "jquery", "underscore", "backbone", "LoginView", "HomeView",
	"countDashBoardView", "countDashBoardModel",  "countDashBoardCollection",
	"applicationjs", /*"datatables",*/ "app_script", /*"objectTransfer", "objZoom",*/ "jquery-ui",  "jqcookie"/*, "jqtip"*/
	], function ($, _ , Backbone, loginView, homeView,  
             countDashBoardView, countDashBoardModel, countDashBoardCollection) {
    var router,
        c;
		
    router= Backbone.Router.extend({
        routes           : {
            ""		                	: "login",
			"home"						: "home",
			"dashBoard/showdashBoard" 	: "dashBoardViewChart",
			"dashBoard/show_count_dasboard" : "count_dashboardViewGraph",
			//"login" 					: "login",
			"*actions"                 	: "defaultAction"
		},
        login : function(){
		AppConfigs.userName = '';
			this.LoginView = new loginView();
			this.LoginView.render();
			console.log("Login Done");
		},
		home: function(){
		var self = this;
		if(this.HomeView){
			this.HomeView.close();
		}
			this.HomeView = new homeView();
			this.HomeView.render(function(){
				
			});
			self.count_dashboardViewGraph();
			this.accord();
			
			
		},
		
		accord:function(){
		$('#accordion').accordion();
		},
		
		/*dashBoard chart view
		********************************/
		dashBoardViewChart: function(){
			alert("Screen Not Ready");
			this.loadHomeView();
		},
		/*count_dashboard graph view*/
		count_dashboardViewGraph: function(){
		//statusTbl(); // status table details
			this.loadHomeView();
			if(this.countDashBoardView){
				this.countDashBoardView.close();
			}
			COUNTdashboardModel = new countDashBoardModel();
			COUNTdashboardCollection = new countDashBoardCollection();

			this.countDashBoardView = new countDashBoardView({model: COUNTdashboardModel, collection: COUNTdashboardCollection});
			//$('#tab_holder').css({'display':'none'});
			this.countDashBoardView.render();
			
		},
		
		loadHomeView :  function(Home_dt){
		
		   var self = this;
			if(this.HomeView =="undefined" || this.HomeView ==undefined){
				//alert("loadHomeView ---homeview called");
				this.HomeView = new homeView();
				this.HomeView.render();
				
				
				
			}
		}
		
    });
    return router;
});