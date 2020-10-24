const httpError = require("../models/errors");
const { v4: uuid } = require('uuid')
//data
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "MIT",
    description: "Hella this is the greatest university",
    location: {
      lat: 70.46,
      lng: 54.45,
    },
    address: "69 Street, London",
    creator: "u1",
  },
];

//route functions
const getPlaceById = (req, res, next) => {
  console.log("GET request in console");
  const placeId = req.params.pid; //{pid:'p1'}
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(new httpError("Couldn't find place for the provided id", 404));
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  console.log("GET request in Users");
  const userId = req.params.uid;
  const user = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!user) {
    return next(
      new httpError("Couldn't find place for the provided user id", 404)
    );
  }
  res.json({ user });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({place:createdPlace})
};

//exports
module.exports = {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
};