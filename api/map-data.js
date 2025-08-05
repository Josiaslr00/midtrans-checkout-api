let mapData = {
  lat: -6.2,
  lng: 106.8,
  zoom: 12,
  place: "Jakarta"
}

export default function handler(req, res) {
  // ✅ Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://azure-run-198389.framer.app")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method === "POST") {
    const { lat, lng, zoom, place } = req.body
    if (lat && lng && zoom && place) {
      mapData = { lat, lng, zoom, place }
      return res.status(200).json({ success: true, mapData })
    } else {
      return res.status(400).json({ error: "Invalid input" })
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(mapData)
  }

  return res.status(405).json({ error: "Method Not Allowed" })
}
