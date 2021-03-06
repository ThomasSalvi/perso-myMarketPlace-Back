const express = require('express');
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const stuffRoutes = require ('./routes/stuff')
const userRoutes = require ('./routes/user')
const app = express();
const path = require ('path')
const connectdb = require('connect');

mongoose.connect(connectdb,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(bodyParser.json())
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;

//Origin, X-Requested-With, Content, Accept, Content-Type, Authorization