const mysql = require('mysql2/promise');

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
    if(entity=='d'){
        connection.query(
            `INSERT INTO Doctor (user_name, password) VALUES ("${username}", "${password}");`
        );
    } else if(entity=='p'){
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
// const SelectAllElements = (username) =>{
//     return new Promise((resolve, reject)=>{
//         connection.query(`SELECT * from Doctor WHERE user_name = "${username}"`,  (error, elements)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(elements);
//         });
//     });
// };
module.exports = {
    connection,
    addUser,
    addScan,
    getPatHist,
    getPatDis,
    searchUser
}