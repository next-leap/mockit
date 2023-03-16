const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000;

const data = fs.readJsonSync(
  path.resolve(__dirname, './configuration/routes.json')
);
const { routes, settings: { features: { cors: corsFeature } = {} } = {} } =
  data;

if (corsFeature) {
  app.use(cors());
}

app.disable('x-powered-by');

routes.forEach((route) => {
  const {
    route: path,
    statusCode,
    payload,
    queryParams,
    disabled = false,
    httpMethod = 'GET',
    headers = []
  } = route;

  const method = httpMethod.toLowerCase();

  if (!disabled) {
    app[method](path, (req, res) => {
      if (queryParams) {
        queryParams.forEach((queryParam) => {
          let paramsMatch = true;
          Object.keys(queryParam.query).forEach((key) => {
            if (queryParam.query[key] !== req.query[key]) {
              paramsMatch = false;
              return;
            }
          });
          if (paramsMatch) {
            const headersToSet = queryParam.headers
              ? queryParam.headers
              : headers;
            headersToSet.forEach(({ header, value } = {}) => {
              res.set(header, value);
            });
            res.status(statusCode).send(queryParam.payload);
          }
        });
      } else {
        headers.forEach(({ header, value } = {}) => {
          res.set(header, value);
        });
        res.status(statusCode).send(payload);
      }
    });
  }
});

app.listen(port, () => console.log(`MockIt app listening on port ${port}!`));

module.exports = app;
