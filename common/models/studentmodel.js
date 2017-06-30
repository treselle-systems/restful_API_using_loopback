'use strict';

module.exports = function(Studentmodel) {

   /** START: To get data from mongodb thru api **/
  Studentmodel.getName = function(shopId, cb) {
    Studentmodel.findById( shopId, function (err, instance) {
        var response =  "Name of the student is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }
  Studentmodel.remoteMethod (
    'getName',
      {
        http: {path: '/getname', verb: 'get'},
        accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
        returns: {arg: 'name', type: 'string'}
      }
   );
   /**END: To get data from mongodb thru api **/
    

    /**START: To insert data into mongodb from api **/
  Studentmodel.addStudent = function(stuname,stucateg, cb) {  
   var newstu = {"name": stuname, "category": stucateg};
    Studentmodel.create( newstu, function (err) {
        var response = "Successfully inserted";
        cb(null, response);
        console.log(response);
    });
  }

  Studentmodel.remoteMethod (
    'addStudent',
     {
       http: {path: '/addstudent', verb: 'get'},
       accepts: [{arg: 'name', type: 'string', http: { source: 'query' } },{arg: 'category', type: 'string', http: { source: 'query' } }],
       returns: {arg: 'response', type: 'string'}
     }
  );
    /**END: To insert data into mongodb from api **/

  /**START: Destroy model instance with the specified ID **/
  Studentmodel.removeStudent = function(stuid, cb) {
    Studentmodel.destroyById( stuid, function (err) {
        var response = "Successfully removed";
        cb(null, response);
        console.log(response);
    });
  }

  Studentmodel.remoteMethod (
    'removeStudent',
     {
       http: {path: '/removestudent', verb: 'get'},
       accepts: {arg: 'id', type: 'string', http: { source: 'query' } },
       returns: {arg: 'response', type: 'string'}
     }
   );
  /**END: Destroy model instance with the specified ID **/


  /**START: Update instance of model with the specified ID **/
  Studentmodel.updateStudent = function(stuid, stuname,stucateg, cb) {
  
    var newstu = {"name": stuname, "category": stucateg};
    Studentmodel.replaceById( stuid,newstu, function (err) {
        var response = "Successfully updated.";
        cb(null, response);
        console.log(response);
    });
  }

  Studentmodel.remoteMethod (
   'updateStudent',
      {
        http: {path: '/updatestudent', verb: 'get'},
        accepts: [{arg: 'id', type: 'string', http: { source: 'query' } }, {arg: 'name', type: 'string', http: { source: 'query' } },{arg: 'category', type: 'string', http: { source: 'query' } }],
        returns: {arg: 'response', type: 'string'}
      }
   );
  /**END: Update instance of model with the specified ID **/

};
