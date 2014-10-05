// File name: collections/lineage_dashBoard_collection
define([
	'underscore',
	'backbone',
	'lineageDashBoardModel'
], function(_, Backbone, lineageDashBoardModel){
	var lineageDashBoardCollection = Backbone.Collection.extend({
		model: lineageDashBoardModel,
		//url: 'http://10.114.52.134:8080/TMobileLog/log.json',
		//url:'/alllog',
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
	return lineageDashBoardCollection;
});