/* file name: models/DashBoardModel
	HCL Tech: 2014
********************************/
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var DashBoardModel = Backbone.Model.extend({
    //url:'http://10.114.82.43:8080/jobSummary/summary_L1.json',
	constructor : function(attributes, options) {
			Backbone.Model.apply( this, arguments );
			if(typeof attributes !== 'undefined') {
				this.url = AppConfigs.baseUrl + attributes.url;
			}
		},
		initialize: function(){
			this.url = AppConfigs.baseUrl + this.url;
		}
  });
  // Return the model for the module
  return DashBoardModel;
});