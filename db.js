// MONGODB STUFF
const MongoClient = require('mongodb').MongoClient;
const mongurl = "mongodb://localhost:27017";
const mongoDatabase = 'cryptobotics'

var state = {
  db: null,
}

exports.connect = function(done) {
  if (state.db) return done()

  const client = new MongoClient(mongurl, { useNewUrlParser: true }) //, mongoptions)

  client.connect()
    .then((cli)=>{
      state.db = cli.db(mongoDatabase) // whatever your database name is
      //console.log(db)
      done()
    })
    .catch((err)=>{
      console.log("OUCH! Error connecting",err)
      done(err)
    })
}

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close()
      .then(()=>{
        state.db = null
        state.mode = null
        done()
      })
      .catch((err)=>{
        done(err)
      })
  }
}