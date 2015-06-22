/**
 * flash
 *
 * @module      :: Policy
 * @description :: Simple policy for flash messages
 *
 */

module.exports = function(req, res, next) {

 res.locals.flash = {};

 if(!req.session.flash) return next();

 res.locals.flash = _.clone(req.session.flash);

 // clear flash
 req.session.flash = {};

 next();
};