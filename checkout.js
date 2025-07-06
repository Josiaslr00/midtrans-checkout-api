export default async function handler(req, res) {
    // ✅ Allow CORS from anywhere (can restrict later)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    // ✅ Handle preflight request (CORS)
    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    // ✅ Reject non-POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" })
    }

    // ✅ Midtrans server key (from Vercel ENV settings)
    const SERVER_KEY = process.env.SERVER_KEY

    if (!SERVER_KEY) {
        return res.status(500).json({ error: "SERVER_KEY not set" })
    }

    try {
        const midtransResponse = await fetch(
            "https://app.sandbox.midtrans.com/snap/v1/transactions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        "Basic " +
                        Buffer.from(SERVER_KEY + ":").toString("base64"),
                },
                body: JSON.stringify(req.body),
            }
        )

        const data = await midtransResponse.json()

        if (!midtransResponse.ok) {
            return res
                .status(midtransResponse.status)
                .json({ error: "Midtrans Error", details: data })
        }

        // ✅ Send Snap token back to frontend
        return res.status(200).json(data)
    } catch (err) {
        console.error("Midtrans Checkout Error:", err)
        return res.status(500).json({ error: "Server Error", details: err })
    }
}
