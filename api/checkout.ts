import type { NextApiRequest, NextApiResponse } from "next"
const midtransClient = require("midtrans-client")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 🔐 CORS FIX
    res.setHeader("Access-Control-Allow-Origin", "https://mpiprototype.framer.website")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    // 🔐 CEK SERVER KEY ADA
    if (!process.env.MIDTRANS_SERVER_KEY) {
        console.error("❌ MIDTRANS_SERVER_KEY is missing")
        return res.status(500).json({ error: "Missing Midtrans server key" })
    }

    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
    })

    try {
        const parameter = req.body
        const transaction = await snap.createTransaction(parameter)
        return res.status(200).json({ token: transaction.token })
    } catch (error) {
        console.error("❌ Midtrans Error:", error)
        return res.status(500).json({ error: "Failed to create transaction" })
    }
}
