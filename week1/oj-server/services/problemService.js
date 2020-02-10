var ProblemModel = require("../dao/problemModel");
var getProblems = function() {
    return new Promise( (resolve, reject) => {
        //resolve( ProblemModel );
        ProblemModel.find( {}, function( err, problems ) {
            if ( err ) reject( err );
            else resolve( problems );
        });
    });
}

var getProblem = function( id ) {
    return new Promise( (resolve, reject) => {
        //resolve( ProblemModel.find( problem => problem.id === id  ) );
        ProblemModel.findOne( {id: id}, function( err, problem ) {
            if ( err ) reject( err );
            else resolve( problem );
            
        });
    });
}

var addProblem = function (newProblem) {
    return new Promise((resolve, reject) => {
        if ( ProblemModel.find( problem => problem.name === newProblem.name) ) {
            reject("Problem name already exists");
        } else {
            newProblem.id = ProblemModel.length + 1;
            ProblemModel.push(newProblem);
            resolve(newProblem);
        }
    //   ProblemModel.findOne({ name: newProblem.name }, function (err, problem){
    //     if(problem){
    //       reject("Problem name already exists");
    //     }else {
    //       ProblemModel.count({}, function (err, num){
    //         newProblem.id = num + 1;
    //         var mongoProblem = new ProblemModel(newProblem);
    //         mongoProblem.save();
    //         resolve(newProblem);
    //       });
    //     }
    //   });
    });
}

module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}