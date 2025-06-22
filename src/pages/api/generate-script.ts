import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { input } = req.body as { input: string }
    const prompt = input;

    const response = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        }),
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch script: ${response.statusText}`)
    }

    const data = await response.json()
    const script = data.choices?.[0]?.message?.content
    return res.status(200).json({ script })
}