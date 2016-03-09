module.exports = function(app) {
	var Ctrl = app.controllers;
	app.get('/', Ctrl.Home.index);
};