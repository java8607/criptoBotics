const Signal = require('../models/signal.model.js');



// Create and Save a new Note
exports.add = (req, res) => {
    res.render('signal/addsignal', { title: 'add signal' })
};

// Create and Save a new Note
exports.create = (req, res) => {

    // Validate request
    if (!req.body.currency) {
        res.status(400)
        res.render('error', { title: "add signal", error: "Signal currency can not be empty" });
        return
    }

    Signal.addSignal(req.body.currency, req.body.input, req.body.t1, req.body.t2, req.body.t3, req.body.stop, req.body.active)
        .then(data => {
            res.render('message', { title: "Signal '" + req.body.currency + "' was created" });
            //res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(err.status)
            res.render('error', { title: "add signal", error: err.error || "Some error occurred while creating the Signal." });
        });
};


exports.showAll = (req, res) => {
    Signal.getAll()
        .then(signals => {
            res.render('signal/showsignal', { title: 'show signals', signals: signals })
        }).catch(err => {
            res.status(500)
            res.render('error', { title: "show all signal", error: err.message || "Some error occurred while retrieving signals." });
        });

};

exports.delete = (req, res) => {
    Signal.deleteSignal(req.params.epoch)
        .then(signal => {
            if (!signal) {
                res.status(404)
                res.send({ message: "Signal not found!  " + req.params.epoch });
                return
            }
            res.render('message', { title: "Signal '" + req.params.epoch + "' was deleted" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404)
                res.send({ message: "Signal not found! " + req.params.epoch });
                return
            } else {
                res.status(500)
                res.send({ message: "Could not delete Signal " + req.params.epoch });
                return
            }
        });
};

exports.deletesignal = (req, res) => {
    Signal.getByEpoch(req.params.epoch)
        .then(signal => {
            res.render('signal/signaldelete', { title: 'Signal Form Delte', signal: signal })
        }).catch(err => {
            res.status(500)
            res.render('error', { title: "delete signal", error: err.message || "Some error occurred while retrieving signals." });
        });
};