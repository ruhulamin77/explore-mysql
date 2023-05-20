const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.json());

const dbConnectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'firstDb',
};
const conn = mysql.createConnection(dbConnectionConfig);

conn.connect(function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log('DB Connected successfully');
  }
});

app.get('/getData', (req, res) => {
  SelectData(conn, req, res);
});

app.post('/saveData', (req, res) => {
  InsertData(conn, req, res);
});

app.get('/', (req, res) => {
  res.end('<h1>Hello Server</h1>');
});

function InsertData(conn, req, res) {
  const { name, age, reg, city } = req.body;
  const SQLQuery = `INSERT INTO student_list (Name, Age, Reg, City) VALUES ('${name}', ${age} , ${reg}, '${city}')`;

  conn.query(SQLQuery, function (error, result) {
    if (error) {
      console.log(error.message);
    } else {
      res.end(JSON.stringify(result));
      console.log('Data inserted successfully');
    }
  });
}

function SelectData(conn, req, res) {
  const SQLQuery = 'SELECT * FROM student_list';
  conn.query(SQLQuery, function (error, result) {
    if (error) {
      console.log(error.message);
    } else {
      res.end(JSON.stringify(result));
    }
  });
}

app.listen(5000, function () {
  console.log('Server listening on port 5000');
});
