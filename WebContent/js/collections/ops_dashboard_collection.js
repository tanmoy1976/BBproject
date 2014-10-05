// File name: collections/dashBoard_Collection
define([
	'underscore',
	'backbone',
	'opsDashBoardModel'
], function(_, Backbone, opsDashBoardModel){
	var opsDashBoardCollection = Backbone.Collection.extend({
		model: opsDashBoardModel,
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
	return opsDashBoardCollection;
});