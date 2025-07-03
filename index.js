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
    {
    id:"1a",    
    username:"sans",
    content:"i love coding",
},
{
    id:"2a",
    username:"john",
    content:"i love javascript",
}, 
{
    id:"3c",
    username:"doe",
    content:"i love python",

}]


app.get('/posts', (req, res) => {
    res.render("index.ejs",{posts});
});

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    posts.push({ username, content });
    res.redirect('/posts');
});
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    console.log(post)


    res.render("show.ejs",{post})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}   );