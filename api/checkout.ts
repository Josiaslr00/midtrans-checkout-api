import type { NextApiRequest, NextApiResponse } from "next"
import midtransClient from "midtrans-client"

// Setup Snap client
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY, // ⬅️ Pakai env var ini di Vercel
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Handle only POST
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    // Setup CORS untuk Framer domain kamu
    res.setHeader("Access-Control-Allow-Origin", "https://mpiprototype.framer.website")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }

    try {
        const parameter = {
            transaction_details: {
                order_id: req.body.transaction_details.order_id,
                gross_amount: req.body.transaction_details.gross_amount,
            },
            item_details: req.body.item_details,
            customer_details: req.body.customer_details,
        }

        const transaction = await snap.createTransaction(parameter)

        res.status(200).json({
            token: transaction.token,
            redirect_url: transaction.redirect_url,
        })
    } catch (error: any) {
        console.error("Midtrans Error:", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
