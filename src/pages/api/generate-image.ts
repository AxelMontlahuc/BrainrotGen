import type { NextApiRequest, NextApiResponse } from "next";

interface GenerateImageRequestBody {
    script: string;
}

interface CloudflareResponse {
    image?: string;
    [key: string]: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { script } = req.body as GenerateImageRequestBody;
    const API_URL =
        "https://api.cloudflare.com/client/v4/accounts/36678f2e1c78d0ed324710680472f2c1/ai/run/@cf/black-forest-labs/flux-1-schnell";
    const API_KEY = process.env.NEXT_PUBLIC_IMAGE_API_KEY;

    const cfRes = await fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: script }),
    });

    if (!cfRes.ok) {
        const text = await cfRes.text();
        res.status(500).json({ error: "Cloudflare error", details: text });
        return;
    }

    const data = await cfRes.json();

    const image = data.result?.image;
    if (!image) {
        res.status(500).json({ error: "No image returned from Cloudflare", details: data });
        return;
    }

    res.status(200).json({ image: image });
}