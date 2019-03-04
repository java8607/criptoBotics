const User = require('../models/user.model.js');



// Create and Save a new Note
exports.add = (req, res) => {
    res.render('users/adduser', { title: 'add user' })
};



// Create and Save a new Note
exports.showAll = (req, res) => {
    User.getAll()
        .then(users => {
            res.render('users/showusers', { title: 'show users', users: users })
        }).catch(err => {
            res.status(500)
            res.render('error', { title: "show all user", error: err.message || "Some error occurred while retrieving users." });
        });

};


// Create and Save a new Note
exports.show = (req, res) => {
    //req.params.userName,req.params.affiliation
    User.getByNameAffiliation(req.params.userName, req.params.affiliation)
        //User.getAll()
        .then(user => {
            //res.render('users/userdelete',{title:'UserFormDelete',user:user})
            res.render('users/userform', { title: 'UserForm', user: user })
        }).catch(err => {
            res.status(500)
            res.render('error', { title: "show user", error: err.message || "Some error occurred while retrieving users." });
        });
};


// Create and Save a new Note
exports.deleteuser = (req, res) => {
    //req.params.userName,req.params.affiliation
    User.getByNameAffiliation(req.params.userName, req.params.affiliation)
        //User.getAll()
        .then(user => {
            res.render('users/userdelete', { title: 'UserFormDelete', user: user })
                //res.render('users/userform',{title:'UserForm',user:user})
        }).catch(err => {
            res.status(500)
            res.render('error', { title: "delete user", error: err.message || "Some error occurred while retrieving users." });
        });
};


// Create and Save a new Note
exports.update = (req, res) => {
    // Validate request
    // console.log (req.body)
    if (!req.body.name) {
        res.status(400)
        res.render('error', { title: "add user", error: "User name can not be empty" });
        return
    }
    if (!req.body.affiliation) {
        res.status(400)
        res.render('error', { title: "add user", error: "User affiliation can not be empty" });
        return
    }
    if (!req.body.machineID) {
        req.body.machineID = ''
    }
    if (!req.body.password) {
        req.body.password = ''
    }

    User.updateUser(req.body.name, req.body.affiliation, req.body.machineID, req.body.password)
        .then(data => {
            res.render('message', { title: "User '" + req.body.name + "' was edited" });
            //res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(err.status)
            res.render('error', { title: "edit user", error: err.error || "Some error occurred while creating the User." });
        });
};


// Create and Save a new Note
exports.resetpassword = (req, res) => {
    User.resetPassword(req.params.userName, req.params.affiliation)
        .then(data => {
            res.render('message', { title: "User '" + req.params.userName + "@" + req.params.affiliation + "' pasword was reset" });
            //res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(err.status)
            res.render('error', { title: "reset password", error: err.error || "Some error occurred while creating the User." });
        });
};



// Create and Save a new Note
exports.resetmachineID = (req, res) => {
    User.resetmachineID(req.params.userName, req.params.affiliation)
        .then(data => {
            res.render('message', { title: "User '" + req.params.userName + "@" + req.params.affiliation + "' machineID was reset" });
            //res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(err.status)
            res.render('error', { title: "reset machineID", error: err.error || "Some error occurred while creating the User." });
        });
};




// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400)
        res.render('error', { title: "add user", error: "User name can not be empty" });
        return
    }
    if (!req.body.affiliation) {
        res.status(400)
        res.render('error', { title: "add user", error: "User affiliation can not be empty" });
        return
    }

    User.addUser(req.body.name, req.body.affiliation)
        .then(data => {
            res.render('message', { title: "User '" + req.body.name + "' was created" });
            //res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(err.status)
            res.render('error', { title: "add user", error: err.error || "Some error occurred while creating the User." });
        });
};


/*

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.getAll()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.getByName(req.params.userName)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with name " + req.params.userName
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with name " + req.params.userName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with name " + req.params.userName
        });
    });
};
*/

// Delete user
exports.delete = (req, res) => {
    User.deleteUser(req.params.userName, req.params.affiliation)
        .then(user => {
            if (!user) {
                res.status(404)
                res.send({ message: "User not found!  " + req.params.userName + "@" + req.params.affiliation });
                return
            }
            res.render('message', { title: "User '" + req.params.userName + "@" + req.params.affiliation + "' was deleted" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                res.status(404)
                res.send({ message: "User not found! " + req.params.userName + "@" + req.params.affiliation });
                return
            } else {
                res.status(500)
                res.send({ message: "Could not delete User " + req.params.userName + "@" + req.params.affiliation });
                return
            }
        });
};