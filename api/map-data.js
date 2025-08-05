let latestData = {
  lat: -6.2297281,
  lng: 106.6894302,
  zoom: 13,
  place: "Jakarta"
};

export default function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle CORS preflight
    return res.status(200).end();
  }

  if (req.method === "POST") {
    latestData = req.body;
    return res.status(200).json({ status: "updated", data: latestData });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestData);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
