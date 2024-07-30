import connectMongoDB from "@/libs/mongodb";
import PlayerXerez from "@/models/PlayerXerez";

export default async function handler(req, res) {
  await connectMongoDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const playerXerezs = await PlayerXerez.find({}).populate("sportsman");
        res.status(200).json({ success: true, data: playerXerezs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const playerXerez = await PlayerXerez.create(req.body);
        res.status(201).json({ success: true, data: playerXerez });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
