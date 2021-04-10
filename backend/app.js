var express = require('express'); //kullandığımız web server frameworkü
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //loglamak için 
var cors = require('cors'); // requestleri sınıflandırmak için

var parserRouter = require('./routes/parser');
var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter); //route ekledik
app.use('/parser', parserRouter); //route ekledik

// error handler  , bütün hataları tek bir yerde toplamak icin kullanılan yapı
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ message: "error" });
});

module.exports = app; // export ederek baska bir yerde bu instance'i kullanabiliriz"