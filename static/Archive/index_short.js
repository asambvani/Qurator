const express = require('express');
const app = express();
const engines = require('consolidate');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');
// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache)
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


