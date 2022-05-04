const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const items = [];

app.get('/', (req, res) => {

  // get the current date
  const today = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  const day = today.toLocaleDateString('en-US', options);

  res.render('list', {kindOfDay: day, newListItem: items});

});


app.post('/', (req, res)=>{

  const item = req.body.newItem;
  items.push(item);

  res.redirect('/');

});

app.post('/delete', (req, res)=>{

  const item = req.body.currentItem;
  index = items.indexOf(item);
  items.splice(index, 1);

  res.redirect('/');

});

app.listen(process.env.PORT);
