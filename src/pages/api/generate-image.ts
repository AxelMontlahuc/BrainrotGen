import type { NextApiRequest, NextApiResponse } from "next";

interface GenerateImageRequestBody {
    script: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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

    const data = await cfRes.json();
    const image = data.result?.image;

    res.status(200).json({ image: image });
}