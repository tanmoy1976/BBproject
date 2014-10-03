define([
    'jquery', 
	'underscore', 
	'backbone', 
 	'text!../templates/dashBoard/lineage_dashboard.html', 
	'lineageDashBoardModel',
	'lineageDashBoardCollection',
	'datatables',
	'applicationjs',
	'd3andv3',
	'nvd3',
	//'d3',
	'svgjs',
	'objectTransfer',
	'objZoom'
], function ($, _, Backbone, tpl, lineageDashBoardModel, lineageDashBoardCollection) {
    var lineageDashBoardView;
    //console.log(FileCopyModel.toJSON());
	
    lineageDashBoardView = Backbone.View.extend({
		el : 'div#screen_content',
		
		initialize: function () {
			//this.template = _.template(tpl);
			this.lineagedashdoardCollection = new lineageDashBoardCollection();
        },
		events : {
		'click div#bubble_chart2' : 'open_Zoomed_bubble',
		'click span#close_zoom' : 'close_zoom_bubble'
		},
		
		open_Zoomed_bubble : function(){
			OjectTransferZoom();
		},
		
		close_zoom_bubble : function(){
			$('#zoom_row').css({'visibility':'hidden','display':'none'});
			$('#zoom_bubble').empty();
		},
        render : function (calback) {
			this.template = _.template(tpl);
            $(this.el).html(this.template());
			self = this;
			
            //this.OPSdashdoardCollection.fetch({
				//timeout:6000,
				//dataType: "json",
				//success : function(msg, data) {
					/*Get current date
					***************************************/
					var d = new Date();

					var month = d.getMonth()+1;
					var day = d.getDate();

					var currentDate = 
						((''+month).length<2 ? '0' : '') + month + '/' +
						((''+day).length<2 ? '0' : '') + day +
						'/'+d.getFullYear();
					$('#date_field').val(currentDate);
					$('#date_field').css({'padding-left':'5px'});
					$('#date_field').datepicker()
					/*call chart function
					**********************************/
					createOjectTransfer();
		},
		
		});
			return lineageDashBoardView;
});