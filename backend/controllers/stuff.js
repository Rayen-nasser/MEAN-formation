const Thing = require("../models/thing");
const fs = require("fs");
exports.getAllThings = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createThing = (req, res, next) => {
  req.body.thing = JSON.parse(req.body.thing);
  const url = req.protocol + "://" + req.get("host");

  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    price: req.body.thing.price,
    userId: req.body.thing.userId,
    imageUrl: url + "/images/" + req.file.filename,
  });

  thing
    .save()
    .then(() => {
      res.status(201).json({ message: "thing created successfully!" });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to create a new thing.", error: error });
    });
};

exports.updateOneThing = (req, res, next) => {
  let thingUpdated = new Thing({
    _id: req.params.id,
  });

  console.log(req);
  if (req.file) {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + "://" + req.get("host");

    thingUpdated = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      price: req.body.thing.price,
      userId: req.body.thing.userId,
      imageUrl: url + "/images/" + req.file.filename,
    };
  } else {
    thingUpdated = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      userId: req.body.userId,
      imageUrl: req.body.thing,
    };
  }

  Thing.updateOne({ _id: req.params.id }, thingUpdated)
    .then((thing) => {
      res.status(201).json({
        message: "Thing has been updated!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    const filename = thing.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};
