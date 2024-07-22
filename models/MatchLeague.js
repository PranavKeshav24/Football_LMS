const mongoose = require("mongoose");

const MatchLeagueSchema = new mongoose.Schema(
  {
    competition_name: { type: String, required: true },
    tier: { type: String, required: true },
    group: { type: String },
    week: { type: Number },
  },
  {
    timestamps: true,
  }
);

const MatchLeague =
  mongoose.models.MatchLeague ||
  mongoose.model("MatchLeague", MatchLeagueSchema);

export default MatchLeague;
