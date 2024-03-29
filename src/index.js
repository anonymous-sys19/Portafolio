const express = require('express');
const path = require('path');
//const bodyParser = require('body-parser');
const router = require('./routes/tasks')
const { engine } = require('express-handlebars');
const { env } = require('process');

// Connection On server 
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.set('server', process.env.PORT || 5500)


app.engine('.hbs', engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, './partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

// Obteniendo Las Rutas 
app.use(express.static(path.join(__dirname, 'public')));
app.use(router)



// On Port: 

app.listen(app.get('server'), () => {
    console.log(`Server is Running:  http://localhost:${app.get('server')}`);
})