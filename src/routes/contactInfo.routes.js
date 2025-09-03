const express = require('express');
const validate = require("../middlewares/validation.middleware");
const contactInfoController = require("../controllers/contactInfo.controllers");
const { 
  addContactInfo, 
  updateContactInfo, 
  getContactInfoById, 
  deleteContactInfo 
} = require("../validations/contactInfo.validations.js");

const router = express.Router();

router.post('/add', validate(addContactInfo), contactInfoController.add);

router.post('/update', validate(updateContactInfo), contactInfoController.update);

router.get('/getById/:id', validate(getContactInfoById), contactInfoController.getById);

router.get('/getActive', contactInfoController.getActive);

router.get('/getAll', contactInfoController.getAll);


router.delete('/:id', validate(deleteContactInfo), contactInfoController.remove);

module.exports = router;
