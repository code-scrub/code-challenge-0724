const express = require('express');
const chalk = require('chalk');
const path = require('path');

const server = express();
const port = process.env.PORT || 9090;
const blogRouter = express.Router();

server.use(express.static(path.join(__dirname, "/public")));
server.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
server.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
server.use('/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));
server.set('views', './src/views');
server.set('view engine', 'ejs');

blogRouter.route('/').get((request, response) => {
    response.render('listPosts', {
        list: [
            { 'title': 'Portent’s Content Idea Generator' },
            { 'title': 'Build Your Own Blog’s Idea Generator' },
            { 'title': 'Blog Title Idea Generator' }]
    });
});

server.get('/posts/1', function(request, response) {
    response.send('Portent’s Content Idea Generator is as simple as they get. Just toss in a keyword and go to town. This generator has some personality, adding little quips and jokes in bubbles alongside the topic suggestions. As is common with these generator tools, some blog topic suggestions will come out a bit silly, but spend enough time on this one and you’ll definitely find some gems.');
});

server.get('/posts/2', function (request, response) {
    response.send('The Blog Post Idea Generator from Build Your Own Blog is a bit different in that you don’t put in any keyword related to your industry – you just tap the “generate blog post idea” button and off you go.');
});

server.get('/posts/3', function (request, response) {
    response.send('This Blog Title Idea Generator from Inbound Now is basically the same as the one listed above. It’s fine. You’ll probably find some nice blog post title ideas. Not much else to say');
});

server.use('/posts', blogRouter);

server.get('/', function (request, response, url) {
    response.render('home')
});

server.listen(port, function () {
    console.log(`Server is listening on port # ${chalk.green(port)}...`);
});