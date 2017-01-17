var express = require('express');
var bodyParser = require('body-parser');
var pg = require( 'pg' );
var path = require('path');
var app = express();
var port = process.env.PORT || 3001;
//create a connection string to our database
var connectionString = 'postgres://localhost:5432/potluckDB';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(port, function(){
  console.log('Server is listening on :', port );
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/view/index.html'));
});

app.get('/foodOptions', function(req, res){
  console.log('hit get foodOptions');

  pg.connect( connectionString, function(err, client, done){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('connected to DB');
      var query = client.query( 'SELECT * FROM foodOptions' );
      //array for options
      var allOptions = [];
      query.on( 'row', function( row ){
        allOptions.push (row);
      });
      query.on( 'end', function(){
        done();
        console.log( allOptions );

        res.send( allOptions );
      });
    }// end if else
  });//end connect
});//end get foodOptions
