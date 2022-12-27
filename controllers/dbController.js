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
const getPatHist = (patient_id)=>{
    // TODO: function select all scans from scans table for a specific patient
};
const getPatDis = (patient_id)=>{
    // TODO: function select diseases of a specific patient
};

module.exports = {
    addUser,
    addScan,
    getPatHist,
    getPatDis
}