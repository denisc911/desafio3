const express = require('express');
const app = express();
const { typeError } = require('./middlewares/errors');
const PORT = 3000;
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.use(cors());
app.use(express.json());

app.use('/user', require('./routes/user.routes'));

app.use(typeError);

app.listen(PORT, () => console.log('servidor levantado en el puerto ' + PORT));
