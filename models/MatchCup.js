const mongoose = require("mongoose");

const MatchCupSchema = new mongoose.Schema(
  {
    competition_name: { type: String, required: true },
    edition: { type: String },
    round: { type: String },
  },
  {
    timestamps: true,
  }
);

const MatchCup =
  mongoose.models.MatchCup || mongoose.model("MatchCup", MatchCupSchema);

export default MatchCup;
