const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;

const apiRoutes = require('./apiRoutes/apiRoutes')

const app = express();

// testing options const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/notes', apiRoutes);

app.get('/', (req,res)=>
{
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/notes', (req,res)=>
{
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


app.listen(PORT, ()=> console.log(`Your app is running at http://localhost:${PORT}`))