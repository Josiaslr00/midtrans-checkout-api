import type { NextApiRequest, NextApiResponse } from "next"
import midtransClient from "midtrans-client"

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Access-Control-Allow-Origin", "https://mpiprototype.framer.website")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }

    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    try {
        const payload = {
            transaction_details: req.body.transaction_details,
            item_details: req.body.item_details,
            customer_details: req.body.customer_details,
        }

        const transaction = await snap.createTransaction(payload)

        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        })
    } catch (err) {
        console.error("Midtrans Error:", err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
