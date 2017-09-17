var express = require('express'),
    axios = require('axios'),
    cors = require('cors');
var app = express();

app.use(cors());
app.use(express.static('./'));


var ins = axios.create({
  baseURL: 'https://api.open.ru/',
  timeout: 1000,
  headers: {"Accept": "application/json"}
});

var goal = {
  name: "",
  symm: "",
  done: ""
}

app.get('/change', (req,res)=>{
  for(var n in req.query){
    goal[n] = req.query[n];
  }
  res.json(goal);
})

app.get('/card', (req, res)=> {
  ins.get('MyCards/1.0.0/MyCardsInfo/cardlist').then(
  (b)=>{
    var info = b.data.Cards.Card;
    res.json(info);
  }).catch(e=> res.json(e) );
});

app.get('/bal/:id', (req, res)=> {
  ins.post('MyCards/1.0.0/MyCardsInfo/balance' , { "CardId": req.params.id })
  .then( (b)=> res.json(b.data) )
  .catch(e=> res.json(e) );
});

app.get('/his/:id', (req, res)=> {
  ins.post('MyCards/1.0.0/MyCardsInfo/history' , { "CardId": req.params.id })
  .then( (b)=> res.json(b.data.CardTransactionsList[0].CardTransaction) )
  .catch(e=> res.json(e) );
});

app.listen(3000, _=> console.log('Example app listening on port 3000!') );
