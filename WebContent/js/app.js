define('App', [
    'jquery', 'underscore', 'backbone', 'Router', 'bootstrap', 'applicationjs'
], function ($, _, Backbone, Router) {
    function initialize() {
        console.log('public:js:app::initialize()');
        var router = new Router();
        Backbone.history.start();
		//this.router.navigate('#login',);
    }
    return {
        initialize: initialize
    };
});