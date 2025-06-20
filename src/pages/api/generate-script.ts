import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { input } = req.body as { input: string }
    const prompt = "I made a website that generates italian brainrot media. For this the user enters what it wants to see in the video and I have to generate a script for the video in italian. The concept of brainrot is talking about nonsense and being goofy (not serious at all, errors are expected). The script has to be pretty short (60 words max). Please generate the script in italian right away, the user input is: " + input

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