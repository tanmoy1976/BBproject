define('LoginView', [
    'jquery', 'underscore', 'backbone', 'text!../templates/login.html','jqcookie'
], function ($, _, Backbone, tpl) {
    var LoginView;
    LoginView = Backbone.View.extend({
        initialize: function () {
            //var ajaxLoader;
            //ajaxLoader = ajaxLoader || $('.ajax-loader');
           // ajaxLoader.hide();
		   //this.el = 'body',
            this.template = _.template(tpl);
           /* $('body').ajaxStart(function () {
                console.log('ajax start')
                ajaxLoader.show();
            }).ajaxStop(function () {
                console.log('stop')
                ajaxLoader.fadeOut('fast');
            });*/
        },
        render    : function () {
            $('body').html(this.template());
			if(typeof AppConfigs.msg != "undefined" || AppConfigs.msg != ""){
			   $('.alert-error').text(AppConfigs.msg).show();
			 }
            return this;
        },
		 events:{
				
			},
		showLoginpage : function(event){
		  window.location.hash = "login";
		},
		login:function () {
		//alert("login")
        //event.preventDefault(); // Don't let this button submit the form
       // $('.alert-error').hide(); // Hide any errors on a new submit
	   var  self = this;
        //var url = '/isUserExists';
		var url = '/login';
        console.log('Loggin in... ');
        var formValues = {
            username: $('#user_name').val(),
            password: $('#user_password').val()
        };

        $.ajax({
            url:AppConfigs.baseUrl + url,
            type:'POST',
            //dataType:"json",
            //data: JSON.stringify(formValues),
			data: formValues,
            success:function (response) {
                /*console.log(["Login request details: ", response.detail]);
               
                if(response.status == -1) {  // If there is an error, show the error messages
                    //$('.alert-error').text(response.detail).show();
					//alert('if error')
					//window.history.pushState(response.detail, 'login', '#login');
					AppConfigs.msg = response.detail;
					window.location.hash = "login";
					
                }
                else { // If not, send them back to the home page
				//alert('else');
                    //window.location.replace('#home');
					//$.cookie('difcookie', "admin", {path:'/'});
					AppConfigs.msg = "";
					AppConfigs.userName = $('#user_name').val();
					window.location.hash = "home";
                }*/
				console.error("Login was OK");
				AppConfigs.msg = "";
				AppConfigs.userName = $('#user_name').val();
				window.location.hash = "home";
            },
			error:function(res, error){
			
			//window.location.hash = "home";
			$('.alert-error').text(error).show();
			}
        });
		
    },
		close : function(){
		 $(this.el).empty();
		 $(this.el).unbind();
		
		}
    });
    return LoginView;
});