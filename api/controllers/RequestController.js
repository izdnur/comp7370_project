/**
 * RequestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // action - Requestpage
    Requestpage: async function (req, res) {

        if (req.method == "GET")
            return res.view('Request/Requestpage');

        if (typeof req.body.Request === "undefined")
            return res.badRequest("Request not received.");

        await Request.create(req.body.Request);
        // await Request.update(req.params.id).set({ borrowerId: req.session.user.id });

        return res.ok("Request Successfully!");
    },

    RequestList: async function (req, res) {
        var model = await Request.find();
        return res.view('Request/RequestList', { request: model });
    },

     lendMoney: async function (req, res) {
     
        uname = req.session.user.username;
        var model = await Request.findOne(req.params.id);
        var borrowedAmount=model.borrowingAmount;
        console.log(model);
        var bId = model.borrowerId; 
        var models= await User.findOne({where:{userid:bId} });
        console.log(models);
        await User.update(req.session.user.id).set({totalmoneylent : borrowedAmount});
        // await User.update(user.model.borrowerId).set({totaldebt : borrowedAmount});

             if (req.wantsJSON) {
                 return res.ok("Money is successfully lent ");
             }
         
         else {
             return res.ok("Transaction unsuccesful");
         }
     },

};

