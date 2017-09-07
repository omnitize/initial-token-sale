
const express    = require('express');
const app        = express();
const portNumber = 3000;
const sourceDir  = 'dist';

const setupApi = require('./dist/src/backend/api').setupApi;

app.use(express.static(sourceDir));

setupApi(app);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
