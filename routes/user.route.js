module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new User
    app.post('/adduser', user.create);

    // Retrieve all Users
    //app.get('/user', user.findAll);

    // Retrieve a single User with userName
    //app.get('/user/:userName', user.findOne);
 
    // Update a User with userName
    //app.put('/user/:userName', user.update);

    // Delete a User with userName

    app.get('/adduser', user.add); 
    app.get('/showusers', user.showAll);

    app.get('/user/:userName/:affiliation', user.show);
    app.post('/user/:userName/:affiliation', user.update);

    app.post('/resetpassword/:userName/:affiliation', user.resetpassword);
    app.post('/resetmachineid/:userName/:affiliation', user.resetmachineID);


    app.get('/deleteuser/:userName/:affiliation', user.deleteuser);
    app.delete('/deleteuser/:userName/:affiliation', user.delete);
    

}