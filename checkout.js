export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const SERVER_KEY = 'SB-Mid-server-OMbsRu_K2fz5lbNdKV5lseVC' // Replace this securely later

  const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Basic ' + Buffer.from(SERVER_KEY + ':').toString('base64'),
    },
    body: JSON.stringify(req.body),
  })

  const data = await response.json()

  if (response.ok) {
    res.status(200).json(data)
  } else {
    res.status(500).json({ error: 'Midtrans error', details: data })
  }
}
