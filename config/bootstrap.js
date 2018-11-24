/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  await Request.createEach([
    {name:"Purchase Books", descr:"I am in urgent need of money for buying some necessary books", startDate:"02/01/2018", dueDate :"09/10/2020",borrowingAmount :"3000",borrowerId:"2040"},
    {name:"Pay Rent", descr:"Need of money urgently for paying my room rent", startDate:"01/04/2018", dueDate :"07/09/2020", borrowingAmount :"2000",borrowerId:"3040"},
    // etc.
    ])

    await User.createEach([
      { username: "sheetal", password: "123", role: "customer", trustRate: 90, accountNumber:"18430481", totaldebt:0, totalmoneylent:0, userId:"1" },
      { username: "letty", password: "123", role: "customer", trustRate: 85, accountNumber:"191243221", totaldebt:0, totalmoneylent:0, userId:"2" },
      { username: "saurabh", password: "123", role: "customer", trustRate: 95, accountNumber:"1114432521", totaldebt:0, totalmoneylent:0, userId:"3" },
      { username: "fei", password: "123", role: "customer", trustRate: 93, accountNumber:"18438296", totaldebt:0, totalmoneylent:0, userId:"4" },
      { username: "lee", password: "123", role: "customer", trustRate: 80, accountNumber:"18445756", totaldebt:0, totalmoneylent:0, userId:"5" },
    ])

    const purchasebooks = await Request.findOne({ name: "Purchase Books" });
    const payrent = await Request.findOne({ name: "Pay Rent" });
    const sheetal = await User.findOne({ username: "sheetal" });
    const letty = await User.findOne({ username: "letty" });
  
  
    await User.addToCollection(sheetal.id, 'supervises').members([purchasebooks.id]);
    await User.addToCollection(letty.id, 'supervises').members([payrent.id]);

      // etc.
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
