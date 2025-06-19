import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { script } = req.body;

  try {
    const cfApiKey = process.env.NEXT_PUBLIC_IMAGE_API_KEY;
    const cfApiUrl = "https://api.cloudflare.com/client/v4/accounts/36678f2e1c78d0ed324710680472f2c1/ai/run/@cf/myshell-ai/melotts";
    
    const cfResponse = await fetch(cfApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: script }),
    });

    if (!cfResponse.ok) {
      const cfErrorText = await cfResponse.text();
      console.error("Cloudflare TTS error:", cfErrorText);
      return res.status(500).json({ error: "Cloudflare TTS error", details: cfErrorText });
    }
    
    const cfAudio = await cfResponse.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    return res.status(200).send(Buffer.from(cfAudio));

  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}