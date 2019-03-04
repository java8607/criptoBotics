var db = require('../db')

const collectionName = 'registeredusers'

   
exports.getAll = (cb) => {
  //  console.log(`\n${req.method} ${req.url}`);
    //const data = fs.readFileSync(path.resolve(__dirname, 'data/MATYPES.json'));
    var collection = db.get().collection(collectionName);

    return new Promise(function(resolve, reject) {
      collection.find().toArray(function(err, results) {
        if (err) {
          reject({error:err,status:500});
        } else {
          if (results.length == 0) {
            reject({error:`no users registered!!!`,status:401})
          }
          resolve(results);
        }
      });
    })
  };

   
// db.registeredusers.insert({     "name": "Jimvar1109",     "machineID":'',     "affiliation":"forwintraders.com"     });


// return Promise
exports.addUser = (name,affiliation) => {
  const user = {'name': name,'affiliation':affiliation, 'machineID':''}

  const collection = db.get().collection(collectionName)

  return new Promise(function(resolve, reject) {
    collection.insertOne(user,function(err, results) { 
      if (err) {
        console.log(err)
        reject({error:err.errmsg,status:500});
      } else {
        if (results.length == 0) {
          reject({error:`${name} is not registered!`,status:401})
        }
        resolve(results);
      }
    })
  })
}

// return Promise
exports.deleteUser = (name,affiliation) => {
  const user = {'name': name,'affiliation':affiliation}

  const collection = db.get().collection(collectionName)

  return new Promise(function(resolve, reject) {
    collection.deleteOne(user,function(err, results) { 
      if (err) {
        console.log(err)
        reject({error:err.errmsg,status:500});
      } else {
        if (results.length == 0) {
          reject({error:`${name} is not registered!`,status:401})
        }
        resolve(results);
      }
    })
  })
}


// return Promise
exports.getByName = (name) => {
  const query = {'name': name}
  const collection = db.get().collection(collectionName)

  return new Promise(function(resolve, reject) {
    collection.find(query).toArray(function(err, results) { 
      if (err) {
        reject({error:err,status:500});
      } else {
        if (results.length == 0) {
          reject({error:`${name} is not registered!`,status:401})
        }
        resolve(results);
      }
    });
  })
}


// return Promise
exports.getByNameAffiliation = (name,affiliation) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)

  return new Promise(function(resolve, reject) {
    collection.find(query).toArray(function(err, results) { 
      if (err) {
        reject({error:err,status:500});
      } else {
        if (results.length == 0) {
          reject({error:`${name}@${affiliation} is not registered!`,status:401})
        }
        resolve(results[0]);
      }
    });
  })
}

exports.getMachineID = (name,affiliation) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)
  return new Promise(function(resolve, reject) {
    collection.findOne(
      query,
      function(err, result) { 
        //console.log(err,result)
        if (err) {
          reject({error:err,status:500});
        } else {
          if (result == null) {
            //console.log( " e r r o r ", err)
            reject(`${name}@${affiliation} is not registered!`)
          } else {
            //resolve("result.machineID");
            resolve(result.machineID);
          }
        }
      })
  }) 
}

exports.updateMachineID = (name,affiliation,keystring) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)
  console.log("Máquina Nueva! ", name, affiliation, "==>", keystring)

  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(
      query,
      {$set: {machineID: keystring}},
      {upsert: false}, 
      function(err, result) { 
        if (err) {
          reject({error:err,status:500});
        } else {
          resolve(result);
        }
      })
  }) //promise 
}

exports.updatePassword = (name,affiliation,password) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)
  console.log("Setting Password!!!! ", name+"@"+affiliation)

  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(
      query,
      {$set: {password: password}},
      {upsert: false}, 
      function(err, result) { 
        if (err) {
          reject({error:err,status:500});
        } else {
          resolve(result);
        }
      })
  }) //promise 
}


exports.resetPassword = (name,affiliation,password) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)
  console.log("Reset Password!!!! ", name+"@"+affiliation)

  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(
      query,
      {$unset: {password: ""}},
      function(err, result) { 
        if (err) {
          reject({error:err,status:500});
        } else {
          resolve(result);
        }
      })
  }) //promise 
}


exports.resetmachineID = (name,affiliation,password) => {
  const query = {'name': name, 'affiliation': affiliation }
  const collection = db.get().collection(collectionName)
  console.log("Reset machineID!!!! ", name+"@"+affiliation)

  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(
      query,
      {$unset: {machineID: ""}},
      function(err, result) { 
        if (err) {
          reject({error:err,status:500});
        } else {
          resolve(result);
        }
      })
  }) //promise 
}

exports.updateUser = (name,affiliation,machineID,password) => {
  const query = {'name': name, 'affiliation': affiliation} 
  const collection = db.get().collection(collectionName)
  console.log("Updating user!!!! ", name+"@"+affiliation) //+ "["+ machineID + ","+password + "]")

  return new Promise( (resolve, reject) => {
    //console.log(query, {$set: {password: password, machineID:machineID}})
    collection.findOneAndUpdate(
      query,
      {$set: {password: password, machineID:machineID}},
      {upsert: false}, 
      function(err, result) { 
        if (err) {
          console.log(err)
          reject({error:err,status:500});
        } else {
          console.log(result)
          resolve(result);
        }
      })
  }) //promise 
}


/*
function updateMachineID(name, affiliation, keystring, callback){
  const query = {'name': name, 'affiliation': affiliation }
  console.log("Máquina Nueva! ", name, affiliation, "==>", keystring)
  var collection = db.get().collection('registeredusers');
  collection.findOneAndUpdate( 
    query,
    {$set: {machineID: keystring}},
    {upsert: true}, 
    callback
  ) 
  return
}

*/
exports.all = (cb) => {
  var collection = db.get().collection(collectionName)

  collection.find().toArray(function(err, docs) {
    cb(err, docs)
  })
}
