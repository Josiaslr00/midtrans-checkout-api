export default async function handler(req, res) {
    // CORS Headers supaya bisa diakses dari Framer
    const allowedOrigin = "https://mpiprototype.framer.website" // ganti sesuai domain kamu

    res.setHeader("Access-Control-Allow-Origin", allowedOrigin)
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const midtransClient = require("midtrans-client")

    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    try {
        const parameter = req.body
        const transaction = await snap.createTransaction(parameter)
        return res.status(200).json({ token: transaction.token })
    } catch (error) {
        console.error("Midtrans Error:", error)
        return res.status(500).json({ error: "Failed to create transaction" })
    }
}
