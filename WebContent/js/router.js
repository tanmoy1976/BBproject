define("Router", [
    "jquery", "underscore", "backbone", "LoginView", "HomeView",
	"countDashBoardView", "countDashBoardModel",  "countDashBoardCollection",
	"applicationjs", "datatables", "app_script", "objectTransfer", "objZoom", "jquery-ui",  "jqcookie", "jqtip"
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
			"dashBoard/show_lineage_dashboard" : "lineage_dashboardViewGraph",
			"auth"						: "authenticate",
			"login" 					: "login",
			"*actions"                 	: "defaultAction"
		},
        /* This is the function create the login view and render the view in screen */  
		login : function(){
		AppConfigs.userName = '';
			this.LoginView = new loginView();
			this.LoginView.render();
			console.log("Login Done");
		},
		/*listeners:
		{
		  specialkey: function(field, e){
		  if (e.getKey() == e.ENTER && )
			this.authenticate();  // call your function to submit the form
		  }
		},*/
		authenticate : function (){
		
		   /*var url = '/isUserExists';
			console.log('Loggin in... ');
			var formValues = {
				userName: $('#user_name').val(),
				password: $('#user_password').val()
			};

			$.ajax({
				url:AppConfigs.baseUrl + url,
				type:'POST',
				dataType:"json",
				data: formValues,
				success:function (response) {
					console.log(["Login request details: ", data]);
				   
					if(data.error) {  // If there is an error, show the error messages
						$('.alert-error').text(data.error.text).show();
						//window.location.hash = "login";
						Backbone.history.navigate('login');
						//alert('if error')
						console.log("login failed");
					}
					else { // If not, send them back to the home page
					//alert('else');
						//window.location.replace('#home');
						AppConfigs.userName = $('#user_name').val();
						window.location.hash = "home";
					}
				},
				error:function(res, exception){
				console.log("login failed");
				
				//window.location.hash = "login";
				Backbone.history.navigate('login');
				$('.alert-error').text(exception).show();
				}
			});*/
		   this.LoginView.login();
		
		},
		/* This is called when user logged in to the systems and shows the default opening screen which shows the file copy entry screen */
		home: function(user){
		var self = this;
		if(this.HomeView){
			this.HomeView.close();
		}
			this.HomeView = new homeView();
			this.HomeView.render(user,function(){
				
			});
			self.count_dashboardViewGraph();
			this.accord();
			var that = this;
			that.cloaseOpenAccord();
			//that.selectedTab();
		},
		changeHieght:function(){
			var content_height = $('#screen_tab').height();
			var menu_height = $('#menu_Panel').height(563);
			var screen_height = $(window).height();
			if(content_height > 537){
				//alert(content_height);
				$('#menu_Panel').height(content_height*1.4);
			}else{
				//alert(content_height);
				$('#menu_Panel').height(563);
			}
			
		},
		
		accord:function(){
		$('#accordion').accordion();
		},
		cloaseOpenAccord : function(){
			//$('#config_button span').removeClass().addClass('fa fa-plus-square fa-lg');
			$('#ops_dashboard_button span').removeClass().addClass('fa fa-tachometer fa-lg');
			//$('#ops_log span').removeClass().addClass('fa fa-plus-square fa-lg');
			/*if($('#config_button').hasClass('ui-state-active')){
				//alert($('#config_button').hasClass('ui-state-active'));
				$('#config_button span').removeClass('fa fa-plus-square fa-lg').addClass('fa fa-minus-square fa-lg');
			}*/
		},
		showNhideTab : function(){
			if($('#ops_log').hasClass('ui-state-active')){
				//alert($('#ops_log').hasClass('ui-state-active'));
				$('#tab_holder').css({'display':'none'});
			}else if($('#open_fileCopy').hasClass('ui-state-default-active')){
				$('#tab_holder').css({'display':'block'});
			}else if($('#open_dbCopy').hasClass('ui-state-default-active')){
				$('#tab_holder').css({'display':'block'});
			}
		},
		
		selectedTab : function(){
			if($('#edit_config').hasClass('create_config_selected')){
				$('#create_config').removeClass('create_config_default').addClass('create_config_selected');
				$('#edit_config').removeClass('create_config_selected').addClass('create_config_default');
			}else if($('#create_config').hasClass('create_config_selected')){
				$('#edit_config').removeClass('create_config_default').addClass('create_config_selected');
				$('#create_config').removeClass('create_config_selected').addClass('create_config_default');
			}
		},
		
		/*dashBoard chart view
		********************************/
		dashBoardViewChart: function(){
		//alert();
		   this.loadHomeView();
		   if(this.DashBoardView){
				this.DashBoardView.close();
			}
			dashboardModel = new DashBoardModel();
			dashboardCollection = new DashBoardCollection();
			
			this.DashBoardView = new DashBoardView({model: dashboardModel, collection: dashboardCollection});
			$('#tab_holder').css({'display':'none'});
			this.DashBoardView.render();
			
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
		lineage_dashboardViewGraph: function(){
		this.loadHomeView();
		if(this.lineageDashBoardView){
				this.lineageDashBoardView.close();
			}
			lineageDashBoardModel = new lineageDashBoardModel();
			lineageDashBoardCollection = new lineageDashBoardCollection();

			this.lineageDashBoardView = new lineageDashBoardView({model: lineageDashBoardModel, collection: lineageDashBoardCollection});
			//$('#tab_holder').css({'display':'none'});
			this.lineageDashBoardView.render();
		},
		loadHomeView :  function(Home_dt){
		
		   var self = this;
			if(this.HomeView =="undefined" || this.HomeView ==undefined){
				//alert("loadHomeView ---homeview called");
				this.HomeView = new homeView();
				this.HomeView.render();
				//self.top3Time(Home_dt);
				//self.bottom3Time(Home_dt);
				
				
			}
		}/*,
		loadLoginView: function(){
			var self = this;
			if(this.LoginView == "undefined" || this.LoginView == undefined){
			this.LoginView = new LoginView();
			this.LoginView.render();
			}
		}*/
		
    });
    return router;
});