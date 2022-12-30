const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'cai.aast.edu',
  user: 'web_8',
  password: '9139',
  database: 'web_8'
});

// add a new user based on entity
const addUser = (user)=>{
    var username = user.username;
    var password = user.password;
    var entity = user.entity;
    if(entity=='D'){
        connection.query(
            `INSERT INTO Doctor (user_name, password) VALUES ("${username}", "${password}");`
        );
    } else if(entity=='P'){
        var hypertension = user.hypertension;
        var diabetes = user.diabetes;
        if(hypertension=='hypertension'){
            hypertension='Yes';
        }
        if(diabetes=='diabetes'){
            diabetes='Yes';
        }
        connection.query(
            `INSERT INTO Patient (user_name, password, Hypertension, Diabetes) VALUES ("${username}", "${password}", "${hypertension}", "${diabetes}");`
        );
    } 
};
const addScan = (scan)=>{
    // TODO: function add a new scan
};
const getPatHist = (pat_username)=>{
    // TODO: function select all scans from scans table for a specific patient
};
const getPatDis = (pat_username)=>{
    // TODO: function select diseases of a specific patient
};
const searchUser = (username)=>{
    connection.query(
        `SELECT user_name from Patient WHERE user_name == "${username}"`,
        (err, results)=> {
            console.log(results);
        }
    );
};

module.exports = {
    addUser,
    addScan,
    getPatHist,
    getPatDis,
    searchUser
}