const statusCode = require("../enums/statusCode");
const CustomError = require("../exceptions/CustomError");
const Users = require("../models/Users");
const mongoose = require("mongoose");

const add = async (data) => {
  try {
    data.emailAddress = data.emailAddress?.trim();
    data.fullName = data.fullName?.trim();
    data.mobileNumber = data.mobileNumber?.trim();
    data.address = data.address?.trim();

    const existing = await Users.findOne({
      emailAddress: data.emailAddress,
    });
   if (existing) {
  throw new CustomError(
    "Email address is already used by another user",
    statusCode.BAD_REQUEST
  );
}

    const user = await Users.create(data);
    return user;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to add user",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const update = async (data) => {
  try {
    const id = data.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid user ID format", statusCode.BAD_REQUEST);
    }

    const user = await Users.findById(id);
    if (!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }

    if (data.emailAddress) {
      data.emailAddress = data.emailAddress.trim();
    }
    if (data.fullName) {
      data.fullName = data.fullName.trim();
    }
    if (data.mobileNumber) {
      data.mobileNumber = data.mobileNumber.trim();
    }
    if (data.address) {
      data.address = data.address.trim();
    }

    // Check if the updated emailAddress already exists in another record
    if (data.emailAddress) {
      const conflict = await Users.findOne({
        _id: { $ne: id },
        emailAddress: data.emailAddress,
      });

      if (conflict) {
        throw new CustomError(
          "Email address already exists in another record",
          statusCode.BAD_REQUEST
        );
      }
    }

    Object.keys(data).forEach((key) => {
      if (key !== "id") user[key] = data[key];
    });

    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to update user",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const remove = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid user ID format", statusCode.BAD_REQUEST);
    }

    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }

    return user;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to delete user",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("Invalid user ID format", statusCode.BAD_REQUEST);
    }

    const user = await Users.findById(id);
    if (!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }

    return user;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch user",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};

const getAll = async () => {
  try {
    const users = await Users.find().sort({ createdAt: -1 });
    return users;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch users",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


const getByEmail = async (emailAddress) => {
  try {
    if (!emailAddress || typeof emailAddress !== "string") {
      throw new CustomError("Invalid email address", statusCode.BAD_REQUEST);
    }

    const email = emailAddress.trim();
    const user = await Users.findOne({ emailAddress: email });

    if (!user) {
      throw new CustomError("User not found", statusCode.NOT_FOUND);
    }

    return user;
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to fetch user by email",
      statusCode.INTERNAL_SERVER_ERROR
    );
  }
};


module.exports = {
  add,
  update,
  remove,
  getById,
  getAll,
  getByEmail
};
