const express = require("express");
const validate = require("../middlewares/validation.middleware");
const {
  addTeamMember,
  updateTeamMember,
  getTeamMemberById,
  deleteTeamMember,
} = require("../validations/teamMembers.validations");
const teamMembersController = require("../controllers/teamMembers.controllers");
const {uploadTeamMember}=require("../middlewares/upload");
const router = express.Router();

router.post("/add",uploadTeamMember, validate(addTeamMember), teamMembersController.add);

router.post("/update",uploadTeamMember, validate(updateTeamMember), teamMembersController.update);

router.get("/getById/:id", validate(getTeamMemberById), teamMembersController.getById);

router.get("/getAll", teamMembersController.getAll);
router.get("/getActive",teamMembersController.getActive);

router.delete("/:id", validate(deleteTeamMember), teamMembersController.remove);

module.exports = router;
