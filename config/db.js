// db.js

const mongurl = "mongodb://localhost:27017";
const mongoDatabase = 'test'//'cryptobotics'


module.exports = {
    url: `${mongurl}/${mongoDatabase}`
}