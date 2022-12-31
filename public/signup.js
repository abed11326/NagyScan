window.onload = start;
function start(){
    username = document.getElementById('username');
    password = document.getElementById('password');
    p_username_val = document.getElementById('username_val');
    p_password_val = document.getElementById('password_val');
    submit_butt = document.getElementById('submit_butt');
}
var username;
var password;
var p_username_val;
var p_password_val;
var submit_butt;

function validate_username(){
    if(username.value.length < 4){
        p_username_val.innerHTML = "Username must be at least 4 characters";
    }else{
        p_username_val.innerHTML = "";
    }
    if(username.value.length >= 4 && password.value.length >= 8){
        submit_butt.disabled = false;
    }
}
function validate_password(){
    if(password.value.length < 8){
        p_password_val.innerHTML = "Password must be at least 8 characters";
    }else{
        p_password_val.innerHTML = "";
    }
    if(username.value.length >= 4 && password.value.length >= 8){
        submit_butt.disabled = false;
    }
}