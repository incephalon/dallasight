var express = require('express');
var mongoose = require('mongoose');
var news = require('./server/controllers/news.server.controller');

var app = express();

app.set('view engine','vash');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname +"/public"));

mongoose.connect('mongodb://localhost/dallasight');

//var controllers = require("./controllers");

app.get('/', function(req, res){
    //res.send("what's up?");
    res.render('default', 
    {
        title:'fuck yea',
        hello:'ehello'
    });
});

app.get('/cool', function(req, res){
    res.send('cool');
});

app.route('/articles')
    .get(news.all);

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});


// app.get('/', function(req, res){
//     //res.send("what's up?");
//     res.render('default', 
//     {
//         title:'fuck yea',
//         hello:'ehello'
//     });
// });

//controllers.init(app);

// app.get('/name/:hello?', function(req, res){
//     res.send(req.params.hello);
// });

// app.get('/okay', function(req, res){
//     res.send('okay');
// });

// app.get('/excellent', function(req, res){
//     res.send('excellent');
// });

// app.get('/cool', (req, res){
//     res.send('cool');
// });


// app.get("/api/sql", function(req, res){
//     var msnodesql = require("msnodesql");
//     var connString="Driver={SQL Server Native Client 10.0};Server=tcp:iugladkxff.database.windows.net,1433;Database=disd_dashboard;Uid=robert@iugladkxff;Pwd=Piggies99;Encrypt=yes;Connection Timeout=30;";

//     msnodesql.query(connString, "SELECT * FROM dbo.staar", function(err, results){
//         res.send(results);
//     });
// });

var server = app.listen(process.env.PORT || 3001, function(){
    console.log("cool");
});