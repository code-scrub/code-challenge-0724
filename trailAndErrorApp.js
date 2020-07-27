const express = require('express');
const chalk = require('chalk');
const async = require('express-async-await');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 9001;

/* GET home page. */
app.get('/', async function (req, resp, next) {
    try {
        const github = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        let body = await github.text();
        let json = JSON.parse(body);
        resp.status(200).send(json);
    }
    catch (error) {
        resp.status(500).send();
    }
});

app.listen(port, function () {
    console.log(`Server is listening on port # ${chalk.green(port)}...`);
});

