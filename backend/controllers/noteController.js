const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc Get Notes for a ticket
// @route GET /api/tickets/:ticketID/notes
// @access PRIVATE
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id and JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketID);
  //   Verify if the ticket is users ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  const notes = await Note.find({ ticket: req.params.ticketID });
  res.status(200).json(notes);
});

// @desc Create Notes for a ticket
// @route POST /api/tickets/:ticketID/notes
// @access PRIVATE
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id and JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.ticketID);
  //   Verify if the ticket is users ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketID,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
