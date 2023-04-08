const { ctrlWrapper } = require("../utils");

const {Contact} = require("../models/contact");

const { HttpError } = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
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
  const result = await Contact.create(req.body);
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
