/* file name: models/DashBoardModel
	HCL Tech: 2014
********************************/
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var countDashBoardModel = Backbone.Model.extend({
    //url: 'http://10.114.52.134:8080/TMobileLog/log.json',
	url:'/alllog',
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
  return countDashBoardModel;
});