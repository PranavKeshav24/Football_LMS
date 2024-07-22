const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    goals_home: { type: Number, required: true },
    goals_away: { type: Number, required: true },
    observations: { type: String },
    chronicle: { type: String },
    referee: { type: mongoose.Schema.Types.ObjectId, ref: "Referee" },
    home_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    away_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    stadium: { type: mongoose.Schema.Types.ObjectId, ref: "Stadium" },
    league: { type: mongoose.Schema.Types.ObjectId, ref: "MatchLeague" },
    cup: { type: mongoose.Schema.Types.ObjectId, ref: "MatchCup" },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.models.Match || mongoose.model("Match", MatchSchema);

export default Match;
