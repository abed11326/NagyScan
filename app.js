// initialize required utilities
const express = require('express');
const app = express();
app.listen(9999);
app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static('public'));
//app.use(express.urlencoded({extended:true}));
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
app.use((req, res)=>{
    res.status(404).render('404', {title:'Page Not found'});
});


// POST requests
app.post('/login', (req, res)=>{
    var {username, password, entity} = req.body;
});
app.post('/signupd', (req, res)=>{
    // console.log(req.body);
});
app.post('/signupp', (req, res)=>{
    // console.log(req.body);
});