// api/checkout.ts
import type { VercelRequest, VercelResponse } from "@vercel/node"
import axios from "axios"

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY
    const base64 = Buffer.from(serverKey + ":").toString("base64")

    const payload = {
        transaction_details: req.body.transaction_details,
        item_details: req.body.item_details,
        customer_details: req.body.customer_details,
        enabled_payments: ["gopay", "shopeepay", "bank_transfer"],
        callbacks: {
            finish: "https://mpiprototype.framer.website", // ⬅️ ganti ini
        },
    }

    try {
        const response = await axios.post(
            "https://api.sandbox.midtrans.com/v1/payment-links",
            payload,
            {
                headers: {
                    Authorization: `Basic ${base64}`,
                    "Content-Type": "application/json",
                },
            }
        )

        return res.status(200).json({ url: response.data.payment_url })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Failed to create payment link" })
    }
}
