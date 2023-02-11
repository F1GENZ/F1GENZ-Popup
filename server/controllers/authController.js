const express = require("express");
const asyncHandler = require("express-async-handler");
const authModel = require("../models/authModel");

const getAuth = asyncHandler(async (req, res) => {
  const orgid = req.body.orgid;
  const auth = await authModel.findOne({ orgid });

  if (!auth) {
    res.status(401);
    throw new Error("Not found");
  }
  res.status(200).json(auth);
});

module.exports = {
  getAuth
}
