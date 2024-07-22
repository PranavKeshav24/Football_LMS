const mongoose = require("mongoose");

const StadiumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
  },
  {
    timestamps: true,
  }
);

const Stadium =
  mongoose.models.Stadium || mongoose.model("Stadium", StadiumSchema);

export default Stadium;
