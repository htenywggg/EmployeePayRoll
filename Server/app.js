var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var SqlString = require('sqlstring');
var app = express();


var connection = mysql.createConnection("mysql://q0atg38pdhqyl3gv:k1jdiqoonnkd4xhf@zf4nk2bcqjvif4in.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/oyiptuzk7t4s86ko")

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.use(express.static(path.join(__dirname, 'public')))
// .set('views', path.join(__dirname, 'views'))
// .set('view engine', 'ejs')
//  .get('/', (req, res) => res.render('pages/index'))
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/getTotalCount', (req, res) => {

  connection.query('select count(*) as totalCount from employees', function (err, c, fields) {
    if (err) throw err
    console.log('Total count: ', c[0].totalCount)
    res.send({ totalCount: c[0].totalCount });
  })
});

//employee = [emp_no: '000', birth_date: '00', first_name: 'Winnie', last_name: 'Australia', gender: 'M', hire_date: '000'];
app.get('/api/create', (req, res) => {

  var sql = SqlString.format('insert into employees set emp_no = ?,birth_date = ?,first_name = ?,last_name = ?,gender = ?,hire_date = ?'
    , [req.query.emp_no, req.query.birth_date, req.query.first_name, req.query.last_name, req.query.gender, req.query.hire_date])
  console.log(sql)
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log('Created new Employee', result);
    res.send({ result: result });
  })
});

app.get('/api/newsalary', (req, res) => {
  var sql = SqlString.format('update salaries set salary = ? where emp_no = ? and from_date = ?', [req.query.salary, req.query.emp_no, req.query.from_date])

  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log('Created new salary for Employee', result);
    res.send({ result: result });
  })
});

//employee = [emp_no: '000', birth_date: '00', first_name: 'Winnie', last_name: 'Australia', gender: 'M', hire_date: '000'];
app.get('/api/update', (req, res) => {

  var sql = SqlString.format('update employees set birth_date = ?,first_name = ?,last_name = ?,gender = ?,hire_date = ? where emp_no = ?',
    [req.query.birth_date, req.query.first_name, req.query.last_name, req.query.gender, req.query.hire_date, req.query.emp_no])
  console.log(sql)
  console.log("just updated employee with employee number 10001");
  connection.query(sql,
    req, function (err, result, fields) {
      if (err) throw err
      console.log(result, result)
    })
});

//delete with emp_no
app.get('/api/delete', (req, res) => {
  console.log("req is " + req.query.emp_no)
  connection.query('delete from employees where emp_no =' + req.query.emp_no, function (err, result, fields) {
    if (err) throw err;
    console.log('Deleted', result);
    res.send({ result: result });
  })
});

// search by emp_no
app.get('/api/employee', (req, res) => {
  var sql = SqlString.format('select * from employees join salaries using(emp_no) where emp_no = ? ORDER BY from_date DESC LIMIT 1', [req.query.emp_no])
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result, result);
    res.send({ result: result })
  })
});

// search by emp_no
app.get('/api/employeeTable', (req, res) => {
  var sql = SqlString.format('select * from employees join salaries using(emp_no) where emp_no = ? ORDER BY from_date DESC', [req.query.emp_no])
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result, result);
    res.send({ result: result })
  })
});

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(createError(404));
});


module.exports = app;
