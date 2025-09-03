const teamMembersService = require("../services/teamMembers.service");
const apiResponse = require("../utils/apiResponse");
const statusCode = require("../enums/statusCode");

exports.add = async (req, res) => {
  try {
    const result = await teamMembersService.add(req, res);
    res.status(statusCode.CREATED).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.CREATED,
        message: "Team member added successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Add TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to add team member",
        result: null,
      })
    );
  }
};

exports.update = async (req, res) => {
  try {
    const result = await teamMembersService.update(req, res);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member updated successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Update TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to update team member",
        result: null,
      })
    );
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await teamMembersService.getById(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetById TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch team member",
        result: null,
      })
    );
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await teamMembersService.getAll();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team members retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetAll TeamMembers Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch team members",
        result: null,
      })
    );
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await teamMembersService.remove(req.params.id);
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Team member deleted successfully",
        result,
      })
    );
  } catch (err) {
    console.error("Remove TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to delete team member",
        result: null,
      })
    );
  }
};

exports.getActive = async (req, res) => {
  try {
    const result = await teamMembersService.getActive();
    res.status(statusCode.OK).json(
      apiResponse({
        success: true,
        isException: false,
        statusCode: statusCode.OK,
        message: "Active team member retrieved successfully",
        result,
      })
    );
  } catch (err) {
    console.error("GetActive TeamMember Error:", err);
    res.status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR).json(
      apiResponse({
        success: false,
        isException: true,
        statusCode: err.statusCode || statusCode.INTERNAL_SERVER_ERROR,
        message: err.message || "Failed to fetch active team member",
        result: null,
      })
    );
  }
};
