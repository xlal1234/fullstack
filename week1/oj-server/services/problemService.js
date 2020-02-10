var problems = [
    {
      id: 1,
      name: "Two Sum",
      desc: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
      difficulty: "EASY"
    },
    {
      id: 2,
      name: "Three Sum",
      desc: 'Given an array S of integers, find three numbers..',
      difficulty: "MEDIUM"
    },
    {
      id: 3,
      name: "4Sum",
      desc: 'Given an array S of integers, find three numbers..',
      difficulty: "MEDIUM"
    },
    {
      id: 4,
      name: "Triangle Count",
      desc: 'Given an array S of integers, find three numbers..',
      difficulty: "Hard"
    },
    {
      id: 5,
      name: "Sliding Window Maximum",
      desc: 'Given an array S of integers, find three numbers..',
      difficulty: "Hard"
    }
];

var getProblems = function() {
    return new Promise( (resolve, reject) => {
        resolve(problems);
    })
}

module.exports = {
    getProblems: getProblems
}