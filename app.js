
const express = require('express');
const app = express();

var mongoose = require("mongoose");
//var count = ;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/Registro', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
  name: { type: String, default: "Anónimo" },
  email: { type: String, default: 1  },
  password: { type: String, default: 1  },
});

var Registro = mongoose.model("Registro", schema);


app.get('/register', (req, res) => {
res.send('<form action="/register" method="post">Name<br><label for="name"><input type="text" id="name" name="name"><br>Email<br><input type="text" name="email" id="email"><br>Contraseña<br><input type="password" id="password" name="password"><br> <button type="submit">Enviar</button></form>');
});
app.use(express.urlencoded());
app.post('/register', (req, res) => {

  var first = new Registro({name: req.body.name, email:req.body.email, password: req.body.password});
  first.save(function(err) {
    if (err) return console.error(err);
});
  res.redirect('/');
  

});
app.get('/', (req, res) => {

  Registro.find({}, function(err, registro) {
            if (err) return console.error(err);
            var datosTabla = registro;


            var $html = "<a href='/register'>Registrarse</a><table><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>"
            for (var i = 0; i < datosTabla.length; i++){
              $html += '<tr><td>'+datosTabla[i].name+'</td><td>'+datosTabla[i].email+'</td></tr>';
            }
            $html += "</tbody></table>";
            res.send($html);
          });
});


app.listen(3000, () => console.log('Listening on port 3000!'));
