/* file name: models/DashBoardModel
********************************/
define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var countDashBoardModel = Backbone.Model.extend({
    //url: '',
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