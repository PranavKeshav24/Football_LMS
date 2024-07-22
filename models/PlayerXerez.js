const mongoose = require("mongoose");

const PlayerXerezSchema = new mongoose.Schema(
  {
    sportsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sportsman",
      required: true,
    },
    position: { type: String, required: true },
    num_matches: { type: Number },
    goals: { type: Number },
    min_played: { type: Number },
    yellows: { type: Number },
    reds: { type: Number },
    comment: { type: String },
    pic: { type: String },
    born_date: { type: Date },
    death_date: { type: Date },
    mat_won: { type: Number },
    mat_draw: { type: Number },
    mat_lost: { type: Number },
  },
  {
    timestamps: true,
  }
);

const PlayerXerez =
  mongoose.models.PlayerXerez ||
  mongoose.model("PlayerXerez", PlayerXerezSchema);

export default PlayerXerez;
