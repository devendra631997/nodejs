var express = require('express')
var app = express()
app.use(express.json());
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.post('/sentiment', async function(req, res) {
if(req.body){
  if(req.body.TextArr){
    var mydocx =req.body.TextArr
    var arr = []
  await mydocx.forEach(function(s){
    arr.push(sentiment.analyze(s));
  })
  res.status(200).send(arr)
  }
  else{
    res.status(500).send(`Body should be Like this => {
      "TextArr": ["I hate apples","I don't eat pepper","the movie was very nice","this book is the best"]
  } `)
  }

}else{
  res.status(500).send(`Body should be Like this => {
    "TextArr": ["I hate apples","I don't eat pepper","the movie was very nice","this book is the best"]
} `)
}
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
