var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );

var router = require('../modules/routes');

app.use( express.static( 'public' ) );
app.use('/', router);

app.listen( 4242, 'localhost', function( req, res ){
  console.log( 'listening on 4242' );
});
