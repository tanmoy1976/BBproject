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
		render    : function (user,callback, Home_dt) {
		    this.template = _.template(tpl);
            console.log("view home render")
            $(this.el).html(this.template({username: AppConfigs.userName}));
			/*left panel top and bottom time consuming table
			*******************************************************/
			$("body").css("overflow-X", "hidden");
			var self = this;
				//self.top3Time(Home_dt);
				//self.bottom3Time(Home_dt);
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