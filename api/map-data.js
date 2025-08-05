// mapData.js (Vercel Serverless Function)
let mapData = {
  lat: -6.2,
  lng: 106.8,
  zoom: 12,
  place: "Jakarta"
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { lat, lng, zoom, place } = req.body;
    if (lat && lng && zoom && place) {
      mapData = { lat, lng, zoom, place };
      return res.status(200).json({ success: true, mapData });
    } else {
      return res.status(400).json({ error: "Invalid input" });
    }
  } else if (req.method === "GET") {
    return res.status(200).json(mapData);
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
