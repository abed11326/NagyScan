const mysql = require('mysql2/promise');

// create the connection to database
const connection = mysql.createConnection({
  host: 'cai.aast.edu',
  user: 'web_8',
  password: '9139',
  database: 'web_8'
});

// add a new user based on entity
async function addUser(user){
    var username = user.username;
    var password = user.password;
    var entity = user.entity;
    if(entity=='Doctor'){
        await (await connection).query(
            `INSERT INTO Doctor (user_name, password) VALUES ("${username}", "${password}");`
        );
    } else if(entity=='Patient'){
        var hypertension = user.hypertension;
        var diabetes = user.diabetes;
        if(hypertension=='hypertension'){
            hypertension='Yes';
        }
        if(diabetes=='diabetes'){
            diabetes='Yes';
        }
        await (await connection).query(
            `INSERT INTO Patient (user_name, password, Hypertension, Diabetes) VALUES ("${username}", "${password}", "${hypertension}", "${diabetes}");`
        );
    } 
};
// add new scan
async function addScan(scan){
    var d_un = scan.d_un;
    var p_un = scan.p_un;
    var date = scan.date; 
    var res  = scan.res;
    await (await connection).query(
        `INSERT INTO Scan (Result, Date, D_user_name, P_user_name) VALUES ("${res}", "${date}", "${d_un}", "${p_un}");`
    );
};
// get patient's test history
async function getPatHist(pat_username){
    var hist = [];
    await (await connection).query(
        `SELECT * from Scan WHERE P_user_name = "${pat_username}"`
    ).then(function(result){
        if (result[0].length > 0) {
            hist = result[0];
        }
    });
    return(hist);
};
// get patien'ts diseases
async function getPatDis(pat_username){
    var hypt;
    var diab;
    await (await connection).query(
        `SELECT * from Patient WHERE user_name = "${pat_username}"`
    ).then(function(result){
        if (result[0].length > 0) {
            hypt = result[0][0].Hypertension;
            diab = result[0][0].Diabetes;
        }
    });
    return({hypt:hypt, diab:diab});
};
// search for a user in the DB
async function searchUser(username){
    var state = 0;
    var stored_password = 0;
    var entity = 0;
    await (await connection).query(
        `SELECT * from Patient WHERE user_name = "${username}"`
    ).then(function(result){
        if (result[0].length > 0) {
            state = 1;
            stored_password = result[0][0].Password;
            entity = 'p';
        }
    });
    if(state === 0){
        await (await connection).query(
            `SELECT * from Doctor WHERE user_name = "${username}"`
        ).then(function(result){
            if (result[0].length > 0) {
                state = 1;
                stored_password = result[0][0].Password;
                entity = 'd';
            }
          });
    }
    return {state, stored_password, entity};
};
module.exports = {
    addUser,
    addScan,
    getPatHist,
    getPatDis,
    searchUser
}