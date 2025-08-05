// /api/map-data.js

let latestData = {
  lat: -6.2297281,
  lng: 106.6894302,
  zoom: 13,
  place: "Jakarta"
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { lat, lng, zoom, place } = req.body;
    latestData = { lat, lng, zoom, place };
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestData);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
