# Mongodb setup

## create user roles

``` json
use cryptobotics

db.registeredusers.createIndex({"name":1,"affiliation":1},{unique:true})

db.registeredusers.insert({"name": "tsalach","machineID":'',"affiliation":"node-net.io"});
db.registeredusers.insert({"name": "node","machineID":'',"affiliation":"node-net.io"});
db.registeredusers.insert({"name": "pepo","machineID":'',"affiliation":"node-net.io"});

db.registeredusers.insert({"name": "pepo","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "PEPO----PEPO","machineID":'',"affiliation":"cryptobotics.co"});


db.registeredusers.insert({"name": "daygris","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "jonysaf","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "julianbeco","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "garymat","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "vicru","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "serch","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "tatisan","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "juancada","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "lorewil","machineID":'',"affiliation":"cryptobotics.co"});
db.registeredusers.insert({"name": "maurozul","machineID":'',"affiliation":"cryptobotics.co"});

```
