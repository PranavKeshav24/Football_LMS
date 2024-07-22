const mongoose = require("mongoose");

const ManagerXerezSchema = new mongoose.Schema(
  {
    sportsman: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sportsman",
      required: true,
    },
    num_matches: { type: Number },
    mat_won: { type: Number },
    mat_draw: { type: Number },
    mat_lost: { type: Number },
    pic: { type: String },
    born_date: { type: Date },
    death_date: { type: Date },
  },
  {
    timestamps: true,
  }
);

const ManagerXerez =
  mongoose.models.ManagerXerez ||
  mongoose.model("ManagerXerez", ManagerXerezSchema);

export default ManagerXerez;
