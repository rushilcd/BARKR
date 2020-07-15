require('dotenv').config({silent: true})

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

//const assistant = require('./lib/assistant.js');
const port = process.env.PORT || 3000

const cloudant = require('./lib/cloudant.js');

const app = express();
app.use(bodyParser.json());

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

app.get('/', (req, res) => {
  //testConnections().then(status => res.json({ status: status }));
  res.send("BARKR API");
});

/**
 * Get a list of resources
 *
 * The query string may contain the following qualifiers:
 * 
 * - type
 * - name
 * - userID
 *
 * A list of resource objects will be returned (which can be an empty list)
 */
app.get('/api/resource', (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  const userID = req.query.userID;
  cloudant
    .find(type, name, userID)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});



/**
 * Upload a single research news
 *
 * The body must contain:
 * - title
 * - link
 *
 * The body may also contain:
 * - description
 * 
 * The ID and rev of the resource will be returned if successful
 */
app.post('/api/upload/news/research', (req, res) => {
  if (!req.body.title) {
    return res.status(422).json({ errors: "Title must be provided"});
  }
  //TODO: verify url
  if (!req.body.link) {
    return res.status(422).json({ errors: "Link must be provided"});
  }

  const title = req.body.title;
  const link = req.body.link;
  const description = req.body.description || '';

  cloudant
    .addResearchNews(title, link, description)
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Upload a single twitter news
 *
 * The body must contain:
 * - title
 * - link
 * - author
 *
 * The body may also contain:
 * - description
 * 
 * The ID and rev of the resource will be returned if successful
 */
app.post('/api/upload/news/twitter', (req, res) => {
  if (!req.body.text) {
    return res.status(422).json({ errors: "Title must be provided"});
  }
  //TODO: verify url
  if (!req.body.link) {
    return res.status(422).json({ errors: "Link must be provided"});
  }
  if (!req.body.author) {
    return res.status(422).json({ errors: "Author must be provided"});
  }

  const text = req.body.text;
  const link = req.body.link;
  const author = req.body.author;

  cloudant
    .addTwitterNews(text, link, author)
    .then(data => {
      if (data.statusCode != 201) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Get a single item by link
 */
app.get('/api/getByLink',(req, res) => {
  cloudant
    .findByLink(req.query.db_name, req.query.link)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});


/**
 * Get any db item
 */
app.get('/api/getById/:id',(req, res) => {
  cloudant
    .findById(req.query.db_name, req.params.id)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});

/**
 * Delete a db item
 */
app.delete('/api/deleteById/:id', (req, res) => {
  cloudant
    .deleteById(req.query.db_name, req.params.id)
    .then(statusCode => res.sendStatus(statusCode))
    .catch(err => handleError(res, err));
});

const server = app.listen(port, () => {
   const host = server.address().address;
   const port = server.address().port;
   console.log(`BARKR Server listening at http://${host}:${port}`);
});

/**
 * Update new resource
 *
 * The body may contain any of the valid attributes, with their new values. Attributes
 * not included will be left unmodified.
 * 
 * The new rev of the resource will be returned if successful
app.patch('/api/resource/:id', (req, res) => {
  const type = req.body.type || '';
  const name = req.body.name || '';
  const description = req.body.description || '';
  const userID = req.body.userID || '';
  const quantity = req.body.quantity || '';
  const location = req.body.location || '';
  const contact = req.body.contact || '';

  cloudant
    .update(req.params.id, type, name, description, quantity, location, contact, userID)
    .then(data => {
      if (data.statusCode != 200) {
        res.sendStatus(data.statusCode)
      } else {
        res.send(data.data)
      }
    })
    .catch(err => handleError(res, err));
});
 */
