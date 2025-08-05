let latestData = {
  lat: -6.2297281,
  lng: 106.6894302,
  zoom: 13,
  place: "Jakarta"
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    latestData = req.body;
    return res.status(200).json({ status: "updated", data: latestData });
  }

  if (req.method === "GET") {
    return res.status(200).json(latestData);
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
