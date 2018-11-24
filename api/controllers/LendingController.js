/**
 * LendingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    Lendrequests: async function (req, res) {
        var model = await Request.find();
        return res.view('Lend/Lendrequests', { request: model });
    },

    Lendlist: async function (req, res) {
        var model = await Request.find();
        return res.view('Lend/Lendlist', { request: model });
    },

    LendingDetailsPage: async function (req, res) {

        var model = await Request.findOne(req.params.id);

        return res.view("Lend/LendingDetailsPage", { model: model });

    },
};

