/* eslint-disable */
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const fetch = require('node-fetch')
const msal = require('@azure/msal-node');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');


const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.use('/userProfile',(req, res) => {
  const url = "https://login.microsoftonline.com/4a8567aa-3a72-4dbd-91f9-b0a141b206f1/oauth2/v2.0/token";

  const params = {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'client_id': '69454f0c-36a1-42e9-a7e5-1f453a124b41',
    'client_secret': 'DDL7Q~ggBz2ZFpmeuY25pB_QSBhbcgom_-IlR',
    'scope': 'access_as_user',
    'requested_token_use': 'on_behalf_of',

  };

  const msalClient = new msal.ConfidentialClientApplication({
    auth: {
      clientId: params.client_id,
      clientSecret: params.client_secret,
      authority: `https://login.microsoftonline.com/4a8567aa-3a72-4dbd-91f9-b0a141b206f1`,
    }
  })

  msalClient.acquireTokenOnBehalfOf({
    oboAssertion: req.query.token,
    scopes: ['User.Read'],
    skipCache: true
  }).then(result => {
    fetch("https://graph.microsoft.com/beta/me/profile",
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + result.accessToken
          },
        }).then(async (response) => {
      console.log(response);
      if (response.ok) {
            const resp = await response.text()
            res.json(resp);
          } else {
            throw (`Error ${response.status}: ${response.statusText}`);
          }
        })

  }).catch(error => {
    console.log(error)
  });

});
// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({logger}));

app.hooks(appHooks);

module.exports = app;
