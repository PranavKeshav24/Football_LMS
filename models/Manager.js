const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
  {
    sportsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sportsman",
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  },
  {
    timestamps: true,
  }
);

const Manager =
  mongoose.models.Manager || mongoose.model("Manager", ManagerSchema);

export default Manager;
