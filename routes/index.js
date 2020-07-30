'use strict';

const { Router } = require('express');
const indexRouter = new Router();

const Place = require('./../models/place');

indexRouter.get('/', (req, res, next) => {
  Place.find().then(places => {
    res.render('index', { title: 'Hello World!', places });
  });
});

module.exports = indexRouter;
