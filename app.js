const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
//const Blog = require('./models/blog.js');
const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();
// connect to mangoDB
const dbURI = 'mongodb+srv://pawkumar:test123@nodeserver.m25sx.mongodb.net/nodeServer?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3002))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//external middleware invoke
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

//sendFile takes the absolute path
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about.ejs', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// //blog routes
// app.get('/blogs', (req, res) => {
//     Blog.find().sort({ createdAt: -1 })
//         .then((result) => {
//             res.render('index.ejs', {blogs: result})
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

// app.post('/blogs', (req, res) => {
//     const blog = new Blog(req.body);

//     blog.save()
//         .then((result) => {
//             res.redirect('/blogs');
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });    

// app.get('/blogs/:id', (req, res) => {
//     const id = req.params.id;
//     Blog.findById(id)
//     .then((result) => {
//         res.render('details', {blog: result});
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;
//     Blog.findByIdAndDelete(id)
//     .then((result) => {
//         res.json({ redirect: '/blogs' });
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })


// app.get('/blogs/create', (req, res) => {
//     res.render('create.ejs', { title: 'Create Blog' });
// });



//404 page
app.use((req, res) => {
    res.status(404).render('404.ejs', { title: '404' });
});