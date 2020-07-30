// METHOD  ENDPOINT/ACTION      DESCRIPTION
// GET  -  '/'                 -  Displays all places view.

// GET  -  '/place/create'      -  Place creation view.
// POST -  '/place/create'      -  Handle place creation form submission. Redirect the user to home view.

// GET  -  '/place/:id'         -  Display single place view.
// POST -  '/place/:id/delete'  -  Delete single place

// GET ? -  '/place/update'      -  Place update view.
// POST -  '/place/update'      -  Handle place update form submission. Redirect the user to home view.

// GET  -  '/error'            -  Display error message.

const express = require('express');
const Place = require('./../models/place');

const placeRouter = new express.Router();

placeRouter.get('/create', (req, res) => {
  res.render('places/create');
});

placeRouter.post('/create', (req, res, next) => {
  console.log(req.body);
  const { name, type, latitude, longitude } = req.body;

  Place.create({
    name,
    type,
    location: {
      coordinates: [latitude, longitude]
    }
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(place => {
      if (!place) {
        next();
      } else {
        res.render('places/single', { place: place });
      }
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Place.findOneAndDelete({ _id: id })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/:id/update', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(place => {
      if (!place) {
        next();
      } else {
        res.render('places/update', { place: place });
      }
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.post('/:id/update', (req, res, next) => {
  const id = req.params.id;
  const { name, type, latitude, longitude } = req.body;

  Place.findOneAndUpdate(
    { _id: id },
    { name, type, location: { coordinates: [latitude, longitude] } }
  )
    .then(() => {
      res.redirect(`/`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = placeRouter;
