module.exports = function(app) {

	var Article = app.models.Article;
	exports.index = function(req, res, next) {
		// var newUser = new Article({
		// 	title: "Title",
		// 	url: "URL",
		// 	text: "Test"
		// });
		// newUser.save();
		res.render('index');
	};

	return exports;
}