const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactInfoSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    trim: true
  },
  infoEmail: {
    type: String,
    required: [true, "Info email is required"],
    trim: true,
    match: [emailRegex, "Please enter a valid email address"]
  },
  salesEmail: {
    type: String,
    required: [true, "Sales email is required"],
    trim: true,
    match: [emailRegex, "Please enter a valid email address"]
  },
  supportEmail: {
    type: String,
    required: [true, "Support email is required"],
    trim: true,
    match: [emailRegex, "Please enter a valid email address"]
  },
  officeAddress: {
    type: [String],
    required: [true, "Office address is required"]
  },
  phoneNumbers: {
    type: [String],
    required: [true, "Phone numbers are required"]
  },
  emails: {
    type: [String],
    required: [true, "Emails array is required"],
    validate: {
      validator: function(arr) {
        return arr.every(email => emailRegex.test(email));
      },
      message: "All emails in the array must be valid"
    }
  },
  businessHours: {
    type: [String],
    required: [true, "Business hours are required"]
  },
  latitude: {
    type: Number,
    required: [true, "Latitude is required"]
  },
  longitude: {
    type: Number,
    required: [true, "Longitude is required"]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: "contact_info",
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
