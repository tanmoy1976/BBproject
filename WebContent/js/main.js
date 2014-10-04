requirejs.config({
    shim : {
        'underscore': {
            exports: '_'
        },
        'backbone'  : {
            deps   : [
                'underscore', 'jquery' ,'applicationjs','d3','d3andv3','nvd3','d3v3min'
            ],
            exports: 'Backbone'
        },
        'bootstrap' : {
            deps   : ['jquery'],
            exports: 'bootstrap'
        },
		'applicationjs' :{
			deps :['jquery'],
			exports:'applicationjs'
		},
		'jquery-ui' :{
		 deps :['jquery']
		}
		,
		'datatables':{
			deps   : ['jquery', 'jquery-ui'],
			exports:'datatables'
		}
		
    },
    paths: {
        'text'                : 'lib/text',
        'jquery'             : 'lib/jquery-1.10.2.min',
        'underscore'      : 'lib/underscore-amd',
        'backbone'         : 'lib/backbone-amd',
        'bootstrap'         : 'lib/bootstrap',
		'jquery-ui'			: 'lib/jquery-ui.min',
		'datatables' :    'lib/jquery.dataTables.min',
		'accordion'			: 'lib/accordion',
		'jqcookie' : 'lib/jquery.cookie',
		'topTime' : 'lib/topTime',
		'bottomTime' : 'lib/bottomTime',
		'jqtip' : 'lib/jquery.qtip',
		
		/*D3 charts script collections
		************************************/
		'd3andv3'		:	'lib/d3.v3',
		'nvd3' 			: 'lib/nv.d3',
		'd3' 			: 'lib/d3',
		'd3v3min' 		: 'lib/d3.v3.min',
		'svgjs' 		: 'lib/jquery.svg',
		'heatmapjs' 	: 'lib/cal-heatmap',
		'objectTransfer' : 'lib/object_transfer',
		'objZoom' : 'lib/object_transfer_zoom',
		'app_script' : 'lib/app_script',
		/*************************************/
		
		'App'                 : 'app',
        'Router'             : 'router',
		"LoginView"    	:"views/loginView",
		"HomeView"		:"views/homeView",
		'applicationjs'      : 'scripts/apps',
		
		/*dashboard
		***************************/
		'DashBoardView' : 'views/dashBoard/showDashBoardChart',
		'DashBoardModel' : 'models/DashBoardModel',
		'DashBoardCollection' : 'collections/dashBoard_Collection',
		/*bookingCount_dashboard
		************************************/
		'countDashBoardView' : 'views/dashBoard/count_dashboard_view',
		'countDashBoardModel' : 'models/count_dashboard_model',
		'countDashBoardCollection' : 'collections/count_dashboard_collection',
		/*lineage_dashboard
		************************************************/
		'statusDashBoardView' : 'views/dashBoard/status_dashboard_view',
		'statusDashBoardModel' : 'models/status_dashboard_model',
		'statusDashBoardCollection' : 'collections/status_dashboard_collection'
	}
});
require(['App','jquery', 'applicationjs'], function (App, $ ) {
	$( document ).ajaxStart(function() {
		$( "#loading" ).show();
	});
	$( document ).ajaxStop(function() {
		$( "#loading" ).hide();
	});
	$.ajaxSetup({
       
		xhrFields: {
			withCredentials: true
		},
		 statusCode: {
				401: function(){
				 
				// Redirec the to the login page.
				  location.href = "#login";
				 
				},
				403: function(){
				location.href = "#login";
				}
		}
         /*error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }*/
    });
	var $doc = $(document);
        $doc.ajaxSend(function (event, xhr) {
           /* var authToken = $.cookie('difcookie');
            if (authToken) {
                xhr.setRequestHeader("Authorization", "Bearer " + authToken);
            }*/
        });
	findAppURL = function(){
		pathArray = window.location.href.split( '/' );
					protocol = pathArray[0];
					host = pathArray[2];
					url = protocol + '//' + host + '/dif';
					return url;
	}
	window.AppConfigs = {
		//baseUrl:'http://devehdp007.unix.gsm1900.org:8087/dif',
		baseUrl:findAppURL(),
		userName:''
	};
    App.initialize({
		
	});
	
});