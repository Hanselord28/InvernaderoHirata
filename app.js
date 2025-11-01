const express = require('express');
const path = require('path');
const app = express();
const oMysql = require('mysql');
const port = 3000;

//conexion a la base de datos
const db = oMysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orchidcare'
});
//verificar conexion|si existe un error lo muestra, de lo contrario muestra el ID de conexion
db.connect((err) => {
  if (err) {
    console.error('Error de conexion a la base de datos: ' + err.stack);
    return;
  }

  console.log('Conectado a la base de datos con el ID ' + db.database);
});

//extras 
app.use(express.urlencoded({ extended: false }));



//motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.get('/', (req, res) => {
  res.render('pages/index');
});


//F.U.C.K

//Find
//Update
//Create
//app.post('/insertar', (req, res) => {
//  const { nombre, especie, fecha_plantacion } = req.body;
//  const sql = 'INSERT INTO plantas (nombre, especie, fecha_plantacion) VALUES (?, ?, ?)';
//  db.query(sql, [nombre, especie, fecha_plantacion], (err, result) => {
//    if (err) {
//      console.error('Error al insertar planta: ' + err.stack);
//      res.status(500).send('Error al insertar planta');
//      return;
//    }
//Kill


//servidor
app.listen(port, () => {
  console.log(`Pagina en http://localhost:${port}`);
});


