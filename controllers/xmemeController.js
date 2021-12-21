const Xmeme = require("../models/xmemeModel");
const mongoose = require("mongoose");

// This function (callback) gives a specific meme if exists.
exports.getMemeById = (req, res) => {
  Xmeme.findOne({ id: req.params.id })
    .select("-createdAt -updatedAt -__v -_id")
    .exec((err, meme) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong! Try again later.",
        });
      }

      if (meme) {
        return res.status(200).json(meme);
      }

      return res.status(404).json({
        error: "The meme you are looking for doesn't exists",
      });
    });
};

// This function (callback) creates a meme if it doesn't exists already
exports.createMeme = (req, res) => {
  const meme = new Xmeme({ id: new mongoose.Types.ObjectId(), ...req.body });

  Xmeme.findOne({ ...req.body }).exec((err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Something went wrong, please try again later.",
      });
    }

    if (result) {
      return res.status(409).json({
          message: 'Resource already exists'
      })
    }

    meme.save((err, meme) => {
      if (err) {
        return res.status(500).json({
          message: "Not able to save user in DB, try again later",
        });
      }
      res.status(201).json({
        id: meme.id,
      });
    });
  });
};

// This function (callback) get a set of 100 memes posted recently
exports.getMemes = (req, res) => {
  Xmeme.find()
    .select("-createdAt -updatedAt -__v -_id")
    .limit(100)
    .sort({ createdAt: -1 })
    .exec((err, memes) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong! Try again later.",
        });
      }
      res.status(200).json(memes);
    });
};

// This function (callback) updates a meme
exports.updateMeme = (req, res) => {
  if (req.body.name) {
    return res.status(422).json({
      message: "Author name cannot be updated.",
    });
  }

  Xmeme.findOneAndUpdate(
    { id: mongoose.Types.ObjectId(req.params.id) },
    { $set: req.body },
    { new: true }
  )
    .select("-createdAt -updatedAt -__v -_id")
    .exec((err, meme) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong! Try again later.",
        });
      }

      if (meme) {
        return res.status(200).json({message: 'Updated Successfully'});
      }

      res.status(404).json({
        error: "Resource does not exists.",
      });
    });
};
