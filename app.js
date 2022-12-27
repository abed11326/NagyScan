// initialize required utilities
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const dbControl = require(__dirname+'/controllers/dbController.js');
const app = express();
app.listen(9999);
app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//app.use(express.json());



// GET requests
app.get('/', (req, res)=>{
    res.render('home', {title:'Home'});
});
app.get('/about', (req, res)=>{
    res.render('about', {title:'About us'});
});
app.get('/login', (req, res)=>{
    res.render('login', {title:'Log In'});
});
app.get('/signupd', (req, res)=>{
    res.render('signup_d', {title:'Doctor Sign Up'});
});
app.get('/signupp', (req, res)=>{
    res.render('signup_p', {title:'Patient Sign Up'});
});
    // TODO: Add home_d and home_p
app.get('/result', (req, res)=>{
    res.render('result', {title:'Test Result'});
});



// POST requests
app.post('/login', (req, res)=>{
    var {username, password, entity} = req.body;
    var user = "TODO: search for it in the entity's table in the database ";
    if(user){
        var auth = bcrypt.compareSync(password, user.password);
        if(auth){
            // TODO: handle successfully login
        } else{
            // TODO: handle incorrect password
        }
    } else{
        // TODO: handle incorrect username
    }
});
app.post('/signupd', (req, res)=>{
    var {username, password} = req.body;
    // TODO: vaildation: must be new user
    var salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    // TODO: test the below function
    dbControl.addUser({
        username: username, 
        password:password, 
        entity:'D'
    });
});
app.post('/signupp', (req, res)=>{
    var {username, password, hyper_tension, diabetes} = req.body;
    // TODO: vaildation: must be new user
    var salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    // TODO: test the below function
    dbControl.addUser({
        username: username, 
        password:password, 
        entity:'P', 
        hyper_tension:hyper_tension, 
        diabetes:diabetes
    });
});


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title:'Page Not found'});
});