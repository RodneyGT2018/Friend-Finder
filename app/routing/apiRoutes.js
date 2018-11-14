//POST routes /api/friends - this handles incoming survey results and will also be used to handle the compatibility logic

//Load new data from friend.js
var friendList = require('../data/friend.js');

module.exports = function(app){
  //GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendList);
  });
  
  //Grab the new friend's scores to compare with friends in friendList array
  app.post('/api/friends', function(req,res){
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //Run through all of the current friends in the list
    for(var i=0; i<friendList.length; i++){
      var scoresDiff = 0;
      //Run through the scores to compare friends and eliminate negative scores
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //Push results into the scoresArray
      scoresArray.push(scoresDiff);
    }

    //After all friends are compared, find the best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
     
      }
    }

    //Return bestMatch 
    var bff = friendList[bestMatch];
    res.json(bff);

    //Push new submission into the friendList array
    friendList.push(req.body);
  });
};