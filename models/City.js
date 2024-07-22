const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    province: { type: String },
    state: { type: String },
    country: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.models.City || mongoose.model("City", CitySchema);

export default City;
