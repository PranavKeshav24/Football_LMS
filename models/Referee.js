const mongoose = require("mongoose");

const RefereeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Referee =
  mongoose.models.Referee || mongoose.model("Referee", RefereeSchema);

export default Referee;
