// initialize required utilities
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbControl = require(__dirname+'/controllers/dbController.js');
const app = express();
app.listen(9999);
app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//app.use(express.json());

const maxAge = 100*24*60*60; // in seconds
const createToken = (id)=>{
    return jwt.sign({id}, "Nagy@16/Aug", {expiresIn: maxAge});  
};

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
app.get('/home_d', (req, res)=>{
    res.render('home_d', {title:'Welcome'});
});
app.get('/home_p', (req, res)=>{
    res.render('home_p', {title:'Welcome'});
});
app.get('/result', (req, res)=>{
    res.render('result', {title:'Test Result'});
});



// POST requests
app.post('/login', (req, res)=>{
    var {username, password} = req.body;
    var user = dbControl.searchUser(username);
    if(user.state==1){
        var auth = bcrypt.compareSync(password, user.stored_password);
        if(auth){
            var token = createToken(username);
            res.cookie('jwt', token, {maxAge:maxAge*1000});
            if(user.entity=='d'){
                // TODO: route to '/home_d'
            }else if(user.entity=='p'){
                // TODO: route to '/home_p'
            }
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
    var token = createToken(username);
    res.cookie('jwt', token, {maxAge:maxAge*1000});
    // TODO: route to '/home_d'
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
    var token = createToken(username);
    res.cookie('jwt', token, {maxAge:maxAge*1000});
    // TODO: route to '/home_p'
});


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title:'Page Not found'});
});