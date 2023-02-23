const express = require('express');
const asyncHandler = require('express-async-handler');
const Data = require('../models/dataModel');
const Auth  = require('../models/authModel');

const getData = asyncHandler( async(req, res) => {
  const data = await Auth.find({ auth: req.auth.id });
  res.status(200).json(data);
})

module.exports = {
  getData
}