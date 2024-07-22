const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
  {
    sportsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sportsman",
      required: true,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    position: { type: String, required: true },
    home: { type: Boolean, required: true },
    starts: { type: Number, required: true },
    minutes: { type: Number, required: true },
    sub_min: { type: Number },
    yellow_1: { type: Number },
    yellow_2: { type: Number },
    red: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default Player;
