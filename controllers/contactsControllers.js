const { ctrlWrapper } = require("../utils");

const {Contact} = require("../models/contact");

const { HttpError } = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page -1) * limit;
  const result = await Contact.find({owner}, {skip: 2, limit: 2}, {versionKey: false, timestamps: false}).populate("owner", "email subscription");

  res.status(200).json(result);
};

const getGetContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

const getAddContact = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.status(200).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  res.status(200).json({
    message: "contact deleted",
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getGetContactById: ctrlWrapper(getGetContactById),
  getAddContact: ctrlWrapper(getAddContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
