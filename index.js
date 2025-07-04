const express= require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride = require('method-override');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))

port=8080

let posts=[
    {
    id:uuidv4(),    
    username:"sans",
    content:"i love coding",
},
{
    id:uuidv4(),
    username:"john",
    content:"i love javascript",
}, 
{
    id:uuidv4(),
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
    let id=uuidv4();
    posts.push({ id,username, content });
    res.redirect('/posts');
});
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id); // Use consistent left-to-right comparison

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs", { post });
});


app.patch("/posts/:id", (req, res) => {
    //console.log("Headers:", req.headers);
    console.log("Body:", req.body); // See what you're getting

    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send("No content received");
    }

    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.redirect("/posts")
    post.content=content;
    // res.redirect(`/posts/${id}`);
    
});

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs", { post });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}   );