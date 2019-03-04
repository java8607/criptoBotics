const path = require('path')
const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const expressWinston = require('express-winston')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3005
const fs = require('fs');

const util = require('./config/config')

const db = require('./db')
const usermodel = require('./models/user.model')
const signalmodel = require('./models/signal.model')

db.connect((err) => {
    if (err) {
        console.log("Error connecting to DB", err)
    }
})

function getCypher(machineID) {
    return new Cypher(machineID)
}

function decolorize(txt) {
    return txt.replace(/\\u001b\[\d+m/g, '')
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

//app.use(methodOverride('_method'))

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.get('/', (req, res, next) => {
    res.render("main")
});

// logging tokens!!

morgan.token('user', (req, res) => {
    if (req.headers.name) {
        return req.headers['name'] + "@" + req.headers['affiliation']
    }
    if (req.body.name) {
        return req.body['name'] + "@" + req.body['affiliation']
    }
    return "-"
})
morgan.token('error', function(req, res) { return JSON.stringify(res.headers) })

morgan.token('address', function(req, res) {
    if (req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for']
    } else {
        return req.connection.remoteAddress
    }
})

app.use(morgan('[:date[clf]] :address "<:user> :method :url HTTP/:http-version"  :status {:res[error]:res[message]} ":user-agent"'))


const userroutes = require('./routes/user.route')(app)
const signalroutes = require('./routes/signal.route')(app)

app.post('/logactivity', (req, res) => {
    //console.log(req.body)
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.setHeader("message", "[" + req.body.activity + "]")
    res.json({ ok: "ok" })
        //resError(res, 404, "user or password invalid")
    return
});



app.get('/regusers', (req, res) => {
    //  console.log(`\n${req.method} ${req.url}`);
    const data = fs.readFileSync(path.resolve(__dirname, 'data/MATYPES.json'));
    var collection = db.get().collection('registeredusers');
    collection.find().toArray(function(err, results) {
        if (err) {
            res.statusCode = 422;
            res.setHeader("Content-Type", "application/json");
            res.json({ error: err });
        } else {
            //console.log(results)
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(results);
        }
    });
});


app.listen(port, () => {
    console.log(`bot.cryptobotics.co server listening on port ${port}!`)

})