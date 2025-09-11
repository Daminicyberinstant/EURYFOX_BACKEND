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

  console.log("Before businessHours : ", contactInfo);
    if (contactInfo && Array.isArray(contactInfo.officeAddress)) {
      contactInfo.officeAddress = formatOfficeAddress(contactInfo.officeAddress);
    }


    if (contactInfo && Array.isArray(contactInfo.businessHours)) {
      // Convert array to object
      const officeHours = {};
      contactInfo.businessHours.forEach(entry => {
        const parts = entry.split(":");
        const day = parts[0].trim();
        const time = parts.slice(1).join(":").trim(); // Handle multiple colons
        officeHours[day] = time;
      });

      // Add formatted version without overwriting original
      contactInfo.businessHours = formatOfficeHours(officeHours);
    }

    console.log("Get Active Hours got called After : ", contactInfo);


    
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

const formatOfficeAddress = (addressArray) => {
  if (!Array.isArray(addressArray)) return [];

  return [
    addressArray[0] || "",
        [addressArray[1], addressArray[2]].filter(Boolean).join(", ") + (addressArray[3] ? " " + addressArray[3] : ""),
    [addressArray[4], addressArray[5]].filter(Boolean).join(", ")
  ];
};
const formatOfficeHours = (officeHours) => {
  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const hours = daysOrder.map(day => ({ day, time: officeHours[day] || "Closed" }));

  const groups = [];
  let currentGroup = { start: hours[0].day, end: hours[0].day, time: hours[0].time };

  for (let i = 1; i < hours.length; i++) {
    const { day, time } = hours[i];
    if (time === currentGroup.time) {
      currentGroup.end = day;
    } else {
      groups.push({ ...currentGroup });
      currentGroup = { start: day, end: day, time };
    }
  }
  groups.push({ ...currentGroup });

  return groups.map(group => {
    const { start, end, time } = group;
    const dayRange = start === end ? start : `${start}-${end}`;
    return `${dayRange} : ${time}`;
  });
};
