const mongoose = require("mongoose");

const SportsmanSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname_1: { type: String, required: true },
    surname_2: { type: String, required: true },
    football_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Sportsman =
  mongoose.models.Sportsman || mongoose.model("Sportsman", SportsmanSchema);

export default Sportsman;
