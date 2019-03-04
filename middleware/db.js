// db.js

const mongurl = "mongodb://localhost:27017";
const mongoDatabase = 'cryptobotics'


module.exports = {
    DB: `${mongurl}/${mongoDatabase}`
}