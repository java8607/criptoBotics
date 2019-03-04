var db = require('../db')

const collectionName = 'registeredsignals'

exports.addSignal = (currency, input, t1, t2, t3, stop, active) => {
    var actualEpoch = new Date().getTime();
    const signal = { 'epoch': actualEpoch.toString(), 'currency': currency, 'input': input, 't1': t1, 't2': t2, 't3': t3, 'stop': stop, 'active': active }

    const collection = db.get().collection(collectionName)

    return new Promise(function(resolve, reject) {
        collection.insertOne(signal, function(err, results) {
            if (err) {
                console.log(err)
                reject({ error: err.errmsg, status: 500 });
            } else {
                if (results.length == 0) {
                    reject({ error: `${name} is not registered!`, status: 401 })
                }
                resolve(results);
            }
        })
    })
}

exports.getAll = (cb) => {
    var collection = db.get().collection(collectionName);

    return new Promise(function(resolve, reject) {
        collection.find().toArray(function(err, results) {
            if (err) {
                reject({ error: err, status: 500 });
            } else {
                if (results.length == 0) {
                    reject({ error: `no signals registered!!!`, status: 401 })
                }
                resolve(results);
            }
        });
    })
};

exports.deleteSignal = (epoch) => {
    const signal = { 'epoch': epoch }

    const collection = db.get().collection(collectionName)

    return new Promise(function(resolve, reject) {
        collection.deleteOne(signal, function(err, results) {
            if (err) {
                console.log(err)
                reject({ error: err.errmsg, status: 500 });
            } else {
                if (results.length == 0) {
                    reject({ error: `${epoch} is not registered!`, status: 401 })
                }
                resolve(results);
            }
        })
    })
}

exports.getByEpoch = (epoch) => {
    const query = { 'epoch': epoch }
    const collection = db.get().collection(collectionName)

    return new Promise(function(resolve, reject) {
        collection.find(query).toArray(function(err, results) {
            if (err) {
                reject({ error: err, status: 500 });
            } else {
                if (results.length == 0) {
                    console.log("Aqui********");
                    reject({ error: `${epoch} is not registered!`, status: 401 })
                }
                resolve(results[0]);
            }
        });
    })
}


exports.all = (cb) => {
    var collection = db.get().collection(collectionName)

    collection.find().toArray(function(err, docs) {
        cb(err, docs)
    })
}