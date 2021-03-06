// File name: collections/dashBoard_Collection
define([
	'underscore',
	'backbone',
	'countDashBoardModel'
], function(_, Backbone, countDashBoardModel){
	var countDashBoardCollection = Backbone.Collection.extend({
		model: countDashBoardModel,
		//url:'',
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
	return countDashBoardCollection;
});