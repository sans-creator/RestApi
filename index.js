const express= require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

port=8080

let posts=[
    {username:"sans",
    content:"i love coding",
},
{
    username:"john",
    content:"i love javascript",
}, 
{
    username:"doe",
    content:"i love python",

}]


app.get('/posts', (req, res) => {
    res.render("index.ejs",{posts});
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}   );