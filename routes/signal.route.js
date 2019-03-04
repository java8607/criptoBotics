module.exports = (app) => {

    const signal = require('../controllers/signal.controller.js');

    // Create a new User
    app.post('/addsignal', signal.create);

    app.get('/addsignal', signal.add);

    app.get('/showsignal', signal.showAll);

    app.get('/deletesignal/:epoch', signal.deletesignal);
    app.delete('/deletesignal/:epoch', signal.delete);


}