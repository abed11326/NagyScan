// add a new user based on entity
const addUser = (user)=>{
    if(user.entity=='D'){
        var {username, password, __} = user;
        // TODO: add on DB
    } else if(user.entity=='P'){
        var {username, password, __, hyper_tension, diabetes} = user;
        // TODO: add on DB
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
    //TODO: search for a user in the database, return {if exists or not, entity, stored_password}
};

module.exports = {
    addUser,
    addScan,
    getPatHist,
    getPatDis,
    searchUser
}