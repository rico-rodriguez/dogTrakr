const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');
// // Import the `ObjectId` function from the `mongodb` package
// const { ObjectId } = require('mongodb');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// This section will help you get a list of all the records.
recordRoutes.route('/record').get(function (req, res) {
  let db_connect = dbo.getDb('employees');
  db_connect
    .collection('records')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route('/record/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('records').findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
recordRoutes.route('/record/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    date: req.body.date,
    time: req.body.time,
    activity: req.body.activity,
  };
  db_connect.collection('records').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.

recordRoutes.route('/record/:id').put(function (req, response) {
  console.log(req.body);
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      date: req.body.date,
      time: req.body.time,
      activity: req.body.activity,
    },
  };
  db_connect.collection('records').updateOne(myquery, newvalues, function (err, res) {
    if (err) {
      // Log the error
      console.error(err);
      // Send a response indicating that there was an error
      response.send({
        success: false,
        message: 'Failed to update record',
      });
      return;
    }
    // Send a response indicating that the record was updated successfully
    response.send({
      success: true,
      message: 'Record updated successfully',
    });
  });
});

// This section will help you delete a record
recordRoutes.route('/record/:id').delete(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('records').deleteOne(myquery, function (err, res) {
    if (err) {
      // Log the error
      console.error(err);
      // Send a response indicating that there was an error
      response.send({
        success: false,
        message: 'Failed to delete record',
      });
      return;
    }
    // Send a response indicating that the record was deleted successfully
    response.send({
      success: true,
      message: 'Record deleted successfully',
    });
  });
});

module.exports = recordRoutes;
