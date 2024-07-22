const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    badge: { type: String },
    is_home: { type: Boolean },
    is_away: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
