import connectMongoDB from "@/libs/mongodb";
import PlayerXerez from "@/models/PlayerXerez";

export default async function handler(req, res) {
  await connectMongoDB();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const playerXerez = await PlayerXerez.findById(id).populate(
          "sportsman"
        );
        if (!playerXerez) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: playerXerez });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const playerXerez = await PlayerXerez.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!playerXerez) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: playerXerez });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedPlayerXerez = await PlayerXerez.deleteOne({ _id: id });
        if (!deletedPlayerXerez) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
