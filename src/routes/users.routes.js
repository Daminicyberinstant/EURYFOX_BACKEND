const express = require("express");
const validate = require("../middlewares/validation.middleware");
const usersController = require("../controllers/users.controllers");
const {
  addUser,
  updateUser,
  getUserById,
  deleteUser,
  getUserByEmail,
} = require("../validations/users.validations");

const router = express.Router();

router.post("/add", validate(addUser), usersController.add);

router.post("/update", validate(updateUser), usersController.update);

router.get("/getById/:id", validate(getUserById), usersController.getById);

router.get("/getByEmail/:email", validate(getUserByEmail), usersController.getByEmail);

router.get("/getAll", usersController.getAll);

router.delete("/:id", validate(deleteUser), usersController.remove);

module.exports = router;
