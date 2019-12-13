var dbconnection = require('../config/dbconnection');

exports.getdata = _getdata;
exports.adddata = _adddata;
exports.deletedata = _deletedata;
exports.updatedata = _updatedata; 

function _getdata(req, res){
    var json = {};
    dbconnection.query('select * from `data`', function(error, results, fields){
        if(error){
            json.status = '0';
            json.err = err;
            json.results = {'msg': 'error data getting'};
            res.send(json);
        } else{
            if(results == null || results == 'undefined' || results == ""){
                json.status = '0';
                json.results = {'msg': 'record is not found'};
                res.send(json);
            } else{
                json.status = '1';
                json.data = JSON.parse(JSON.stringify(results));
                json.result = { 'msg': 'Data successfully found'};
                res.send(json);
            }
        }
    });
};

function _adddata(req, res) {

    var json = {};
    var dataObject = {
        'email': req.body.email,
        'password': req.body.password
    };
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    dbconnection.query("INSERT INTO `data`  SET email = '"+ email +"', password = '"+password+"'", function (error, results, fields) {
        if (error) {
            json.status = '0';
            json.err = error;
            json.result = { 'msg': 'error occour while add data' };
            res.send(json);
            console.log(error);
        } else {
            json.status = '1';
            json.appointments = JSON.parse(JSON.stringify(results));
            json.result = { 'msg': 'data successfully added' };
            res.send(json);
        }
    });
};


function _deletedata(req, res){
    var json = {};
    var id = req.params.id;
    dbconnection.query("DELETE FROM `data` WHERE `id`='"+ id +"'", function(error, results, fields){
        if (error) {
            json.status = '0';
            json.err = err;
            json.result = { 'msg': 'error occour while delete' };
            res.send(json);
        } else {
            json.status = '1';
            json.appointments = JSON.parse(JSON.stringify(results));
            json.result = { 'msg': 'successfully deleted' };
            res.send(json);
        }
    });
};

function _updatedata(req,res){
    var json = {};
    var id = req.params.id;
    var email = req.body.email;
    var password = req.body.password;
    dbconnection.query("UPDATE `data` set email = '"+ email +"', password = '"+password+"' WHERE `id`='"+id+"'", function(error, results, fields){
        if (error) {
            json.status = '0';
            json.err = err;
            json.result = { 'msg': 'error occour while update' };
            res.send(json);
        } else {
            json.status = '1';
            json.appointments = JSON.parse(JSON.stringify(results));
            json.result = { 'msg': 'successfully update' };
            res.send(json);
        }
    });
}