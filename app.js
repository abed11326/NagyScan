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
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({extended:true}));
//app.use(express.json());
const formidable = require('formidable');


const maxAge = 100*24*60*60; // in seconds
const createToken = (id)=>{
    return jwt.sign({id}, "Nagy@16-Aug-1995__&&__Haroon@06-Jan-1999", {expiresIn: maxAge});  
};
const verifyToken = (req_tok)=>{
    try{
        var req_data = jwt.verify(req_tok, "Nagy@16-Aug-1995__&&__Haroon@06-Jan-1999");
        return req_data
    }catch{
        return 0;
    }  
};

// GET requests
app.get('/', (req, res)=>{
    res.render('home', {title:'Home', cssFile:'home'});
});
app.get('/about', (req, res)=>{
    res.render('about', {title:'About us', cssFile:'about'});
});
app.get('/login', (req, res)=>{
    var msg = req.query.msg||'';
    var req_tok = req.cookies.jwt;
    if(req_tok){
        var req_data = verifyToken(req_tok);
        if(req_data == 0){
            res.render('login', {title:'Log In', cssFile:'login', msg:msg});
        }else{
            res.redirect('/profile');
        }
    }else{
        res.render('login', {title:'Log In', cssFile:'login', msg:msg});
    }
    // var msg = req.query.msg||'';
    // res.render('login', {title:'Log In', cssFile:'login', msg:msg});
});
app.get('/signup', (req, res)=>{
    var msg=req.query.msg||'';
    res.render('signup', {title:'Patient Sign Up', cssFile:'signup', msg:msg});
});
app.get('/profile', async(req, res)=>{
    var req_tok = req.cookies.jwt;
    if(req_tok){
        var req_data = verifyToken(req_tok);
        if(req_data == 0){
            res.redirect('/login');
        }else{
            var user = await dbControl.searchUser(req_data.id);
            if(user.state==1){
                if(user.entity=='d'){
                    res.render('home_d', {title:'Welcome',cssFile:'home_d'});
                }else{
                    res.render('home_p', {title:'Welcome',cssFile:'home_p'});
                }
            }else{
                res.redirect('/login');
            }
        }
    }else{
        res.redirect('/login');
    }
});
app.get('/result', async(req, res)=>{
    // console.log(req.query);
    var p_un = req.query.p_un || '';
    var t_res = req.query.t_res || '';
    var req_tok = req.cookies.jwt;
    if(req_tok){
        var req_data = verifyToken(req_tok);
        if(req_data == 0){
            res.redirect('/login');
        }else{
            var user = await dbControl.searchUser(req_data.id);
            if(user.state==1){
                if(user.entity=='d'){
                    await dbControl.addScan({d_un:req_data.id, p_un:p_un, date:'2023-01-01', res:t_res});
                    var dis = await dbControl.getPatDis(p_un);
                    var hypt = dis.hypt;
                    var diab = dis.diab;
                    res.render('result', {title:'Test Result', cssFile:'result', d_un:req_data.id, p_un:p_un, t_res:t_res, hypt:hypt, diab:diab});
                }else{
                    res.redirect('/profile');
                }
            }else{
                res.redirect('/login');
            }
        }
    }else{
        res.redirect('/login');
    }
});
app.get('/logout', async (req, res)=>{
    await res.cookie('jwt', 0, {maxAge:maxAge*1000});
    res.redirect('/login');
});



// POST requests
app.post('/login', async (req, res)=>{
    var {username, password} = req.body;
    var user = await dbControl.searchUser(username);    
    if(user.state==1){
        var auth = bcrypt.compareSync(password, user.stored_password);
        if(auth){
            var token = createToken(username);
            await res.cookie('jwt', token, {maxAge:maxAge*1000});
            res.redirect('/profile');
        } else{
            res.redirect('/login?msg=Incorrect Password');
        }
    } else{
        res.redirect('/login?msg=Invalid Username');
    }
});
// app.post('/signup_d', async(req, res)=>{
//     var {username, password} = req.body;
//     var user = await dbControl.searchUser(username);
//     if(user.state==1){
//         res.redirect('/signup_d?msg=Username already exists');
//     }
//     else{
//         var salt = bcrypt.genSaltSync();
//         password = bcrypt.hashSync(password, salt);
//         await dbControl.addUser({
//             username: username, 
//             password:password, 
//             entity:'d'
//         });
//         var token = await createToken(username);
//         await res.cookie('jwt', token, {maxAge:maxAge*1000});
//         await res.redirect('/profile');
//     }
// });
app.post('/signup', async(req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var entity = req.body.entity;
    var diabetes = req.body.diabetes||'No';
    var hypertension = req.body.hypertension||'No';
    var user = await dbControl.searchUser(username);
    if(user.state==1){
        res.redirect('/signup?msg=Username already exists');
    }
    else{
        var salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);
        await dbControl.addUser({
            username: username, 
            password:password, 
            entity:entity, 
            diabetes:diabetes,
            hypertension:hypertension 
        });
        var token = await createToken(username);
        await res.cookie('jwt', token, {maxAge:maxAge*1000});
        await res.redirect('/profile');
    }
});
app.post('/scan', async(req, res)=>{
    var form = new formidable.IncomingForm();
    await form.parse(req, await async function(err, fields, files) {
    //   console.log(fields);
    //   console.log(files);
        var pun=fields.username;
        // var t_res = ml_model(image);
        res.redirect(`/result?p_un=${pun}&t_res=Negative`);
    });
});


// 404 page
app.use((req, res)=>{
    res.status(404).render('404', {title:'Page Not found', cssFile:'404'});
});