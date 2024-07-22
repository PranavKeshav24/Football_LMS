const mongoose = require("mongoose");

const SeasonXerezSchema = new mongoose.Schema(
  {
    season: { type: String, required: true },
    num_matches_played: { type: Number, required: true },
    place: { type: String },
    result: { type: String },
  },
  {
    timestamps: true,
  }
);

const SeasonXerez =
  mongoose.models.SeasonXerez ||
  mongoose.model("SeasonXerez", SeasonXerezSchema);

export default SeasonXerez;
