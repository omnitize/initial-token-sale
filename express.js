
const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDirs = [ './dist', './static' ];

const setupApi = require('./dist/src/backend/api').setupApi;

sourceDirs.forEach(
	sd => app.use(express.static(sd))
);

setupApi(app);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from ${sourceDirs}`);
});
