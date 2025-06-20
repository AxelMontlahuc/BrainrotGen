import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    if (loading) return;
    setLoading(true);

    const imgRes = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script }),
    });
    const imgData = await imgRes.json();
    setImageUrl(`data:image/jpeg;base64,${imgData.image}`);

    const audioRes = await fetch("/api/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ script }),
    });
    const audioJson = await audioRes.json();
    console.log("Audio JSON:", audioJson);
    console.log("Audio Base64:", audioJson.result.audio);
    console.log("Audio URL:", `data:audio/mpeg;base64,${audioJson.result.audio}`);
    setAudioUrl(`data:audio/mpeg;base64,${audioJson.result.audio}`);

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center m-8">
      <h1 className="text-4xl mb-4">Generate Brainrot Media</h1>
      <div className="flex space-x-8">
        <div className="w-80 border bg-gray-100 flex flex-col items-center p-4 space-y-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated"
              className="w-full h-auto rounded"
            />
          ) : (
            <p>{loading ? "Generating image..." : "No image generated yet."}</p>
          )}

          {audioUrl ? (
            <audio
              src={audioUrl}
              controls
              preload="auto"
              className="w-full"
            />
          ) : (
            <p>{loading ? "Generating audio..." : "No audio generated yet."}</p>
          )}
        </div>

        <div className="flex flex-col">
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-96 h-80 mb-4"
          />
          <Button onClick={generateVideo} disabled={loading}>
            {loading ? "Generating..." : "Generate Media"}
          </Button>
        </div>
      </div>
    </main>
  );
}