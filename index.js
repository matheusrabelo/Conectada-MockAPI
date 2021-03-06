const [zombie] = require('./zombies.json');
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('tiny'));
zombie.routes.forEach(route => {
    const handler = (request, response) => {
        response.set(route.response.header)
                .status(route.response.status)
                .json(route.response.body);
    };

    const method = route.method.toLowerCase();
    app[method](route.path, handler);
});

app.use('*', (req, res) => res.status(404).json([]));
app.listen(port, console.log('Zombie ' + port + ' is walking'));
