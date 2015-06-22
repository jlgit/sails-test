/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function (req, res) {

		Users.find(function(err, users){
			if (err) return res.serverError(err, 500);

			return res.view({
				model: users
			});
		})
	},

	new :function (req, res) {
		return res.view('users/edit', {
			user: ''
		});
	},

	edit :function (req, res) {
		var params = req.params.all();

		Users.findOne({ id: params.id }, function(err, user){
			if (err) return res.serverError(err);
			
			if (user && user.length) {
				return res.send({error: 'User does not exists'}, 403.9);
			}
			
			return res.view({
				user: user
			});
		})
	},

	save: function (req, res, next) {

		var params = req.params.all();

		if (params.id !== undefined) {

		    Users.update({ id: params.id },{name: params.name, username: params.username, email: params.email}, function(err){
				if (err) {
					req.session.flash = {
						err: err.Errors
					}
				}

				return res.redirect('users');

			});
		} 
		else 
		{
			Users.create(params, function(err, user) {
		        if (err) {
		        	req.session.flash = {
			          	err: err.Errors
			        }
			   	}

		        return res.redirect('users');
		    });
		}
	},

	destroy: function (req, res, next) {
		var params = req.params.all();

		Users.destroy({ id: params.id }, function(err) {
	        if (err) return next(err);

	        res.redirect('users');
		});
	},
};

