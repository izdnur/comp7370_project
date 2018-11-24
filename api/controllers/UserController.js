/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    Homepage: async function (req, res) {

        //    if (req.method == "GET")
        //     return res.view('User/Homepage');
        var model = await User.findOne(req.session.user.id);
        return res.view('User/Homepage', { user: model });

    },

    // action - index
    index: async function (req, res) {

        return res.view('User/index');


    },

    login: async function (req, res) {

        if (req.method == "GET") return res.view('User/login');

        if (!req.body.username) return res.badRequest();
        if (!req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401);
            return res.send("User not found");
        }

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.user = user;
            sails.log("Session: " + JSON.stringify(req.session));

            if (req.wantsJSON) {

                return res.redirect('/User/Homepage');
            } else {
                return res.ok("Login successfully");
            }


        });

    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            // return res.ok("Log out successfully");
            return res.redirect('/User/login');

        });

    },
};

