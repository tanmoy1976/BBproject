// File name: collections/dashBoard_Collection
define([
	'underscore',
	'backbone',
	'DashBoardModel'
], function(_, Backbone, DashBoardModel){
	var DashBoardCollection = Backbone.Collection.extend({
		model: DashBoardModel,
		//url:'http://10.114.82.43:8080/jobSummary/summary_L1.json',
		constructor : function(attributes, options) {
			Backbone.Collection.apply( this, arguments );
			if(typeof attributes !== 'undefined') {
				this.url = AppConfigs.baseUrl + attributes.url;
			}
		},
		initialize: function(){
			this.url = AppConfigs.baseUrl + this.url;
		}
	});
	return DashBoardCollection;
});