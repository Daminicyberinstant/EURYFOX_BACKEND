const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const ContactInfo = require("../models/ContactInfo");
const mongoose = require("mongoose");

const add = async (data) => {
  try {
       if (data.isActive) {
      // If this new contact info is active, set all others to false
      await ContactInfo.updateMany({ isActive: true }, { isActive: false });
    }

    const contactInfo = await ContactInfo.create(data);
    return contactInfo;
  } catch (error) {
    throw new CustomError(error.message || "Failed to add contact info", statusCode.INTERNAL_SERVER_ERROR);
  }
};

const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid contact info ID format", statusCode.BAD_REQUEST);
    }

    const contactInfo = await ContactInfo.findById(id);
    if (!contactInfo) {
      throw new CustomError("Contact info not found", statusCode.NOT_FOUND);
    }
    if (data.isActive) {
      await ContactInfo.updateMany(
        { _id: { $ne: id }, isActive: true },
        { isActive: false }
      );
    }


    Object.keys(data).forEach((key) => {
      contactInfo[key] = data[key];
    });

    const updatedContact = await contactInfo.save();
    return updatedContact;
  } catch (error) {
    throw new CustomError(error.message || "Failed to update contact info", statusCode.INTERNAL_SERVER_ERROR);
  }
};

const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid contact info ID format", statusCode.BAD_REQUEST);
    }

    const contactInfo = await ContactInfo.findByIdAndDelete(id);
    if (!contactInfo) {
      throw new CustomError("Contact info not found", statusCode.NOT_FOUND);
    }

    return contactInfo;
  } catch (error) {
    throw new CustomError(error.message || "Failed to delete contact info", statusCode.INTERNAL_SERVER_ERROR);
  }
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid contact info ID format", statusCode.BAD_REQUEST);
    }

    const contactInfo = await ContactInfo.findById(id);
    if (!contactInfo) {
      throw new CustomError("Contact info not found", statusCode.NOT_FOUND);
    }

    return contactInfo;
  } catch (error) {
    throw new CustomError(error.message || "Failed to fetch contact info", statusCode.INTERNAL_SERVER_ERROR);
  }
};

const getActive = async () => {
  try {
    const contactInfo = await ContactInfo.findOne({ isActive: true });
    return contactInfo;
  } catch (error) {
    throw new CustomError(error.message || "Failed to fetch active contact info", statusCode.INTERNAL_SERVER_ERROR);
  }
};

const getAll = async () => {
  try {
    const contactInfos = await ContactInfo.find().sort({ createdAt: -1 });
    return contactInfos;
  } catch (error) {
    throw new CustomError(error.message || "Failed to fetch contact infos", statusCode.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  add,
  update,
  remove,
  getById,
  getActive,
  getAll,
};
