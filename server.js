const express = require('express');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
//const async = require('express-async-await');
const fetch = require('node-fetch');

const server = express();
const blogRouter = express.Router();
const port = process.env.PORT || 9090;
const url = 'https://jsonplaceholder.typicode.com/posts';

server.set('views', './src/views');
server.set('view engine', 'ejs');

server.use(express.static(path.join(__dirname, "/public")));
server.use('/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
server.use('/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
server.use('/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));
server.use('/posts', blogRouter);

async function getJSONData(url) {
    try {
        let data = await fetch(url)
        let body = await data.text();
        let json = JSON.parse(body);
        fs.writeFile('./files/PostsList.txt', body, JSON, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        return json;
    }
    catch (error) {
        fs.unlink('./files/PostsList.txt');
        console.log('Opps, an error occurred', error);
    }
}

function preLoad() {
    getJSONData(url);
}

blogRouter.route('/').get((request, response) => {
    response.render('postListView', {
        posts: JSON.parse(fs.readFileSync('./files/PostsList.txt'))
    });
});

blogRouter.route('/:id')
    .get((request, response) => {
        const id = request.params.id;
        const posts = JSON.parse(fs.readFileSync('./files/PostsList.txt'));
        response.render('postView', { post: posts[id] });
    });

server.get('/', function (request, response, url) {
    response.render('homeView')
});

server.listen(port, function () {
    console.log(`Server is listening on port # ${chalk.green(port)}...`);
    preLoad();
});