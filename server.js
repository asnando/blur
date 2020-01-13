const express = require('express');
const bodyParser = require('body-parser');
const {
  name: packageName,
} = require('./package.json');
const blur = require('./functions/blur');

const serverPort = process.env.PORT || 80;

const { log: print } = console;

const app = express();
const router = express.Router();

function onServerUp() {
  print(`${packageName} up and running on port ${serverPort}`);
}

router
  .get('/', async (req, res) => {
    const {
      statusCode,
      body,
      headers,
    } = await blur(req);
    if (headers) res.set(headers);
    res.status(statusCode).send(body);
  });

app
  .use(bodyParser.json())
  .use(router)
  .listen(serverPort, onServerUp);
