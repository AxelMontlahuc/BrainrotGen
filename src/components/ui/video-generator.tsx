import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

async function returnImageURL(script: string) {
  const imgRes = await fetch("/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ script }),
  });
  const imgData = await imgRes.json();
  return `data:image/jpeg;base64,${imgData.image}`;
}

async function returnAudioURL(script: string) {
  const audioRes = await fetch("/api/generate-audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ script }),
  });
  const audioData = await audioRes.json();
  return `data:audio/mpeg;base64,${audioData.result.audio}`;
}

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    if (loading) return;
    setLoading(true);

    const imageURL = await returnImageURL(script);
    const img = new Image();
    img.src = imageURL;
    await new Promise((r) => (img.onload = r));

    const audioURL = await returnAudioURL(script);
    const audio = new Audio(audioURL);

    const audioCtx = new AudioContext();
    const sourceNode = audioCtx.createMediaElementSource(audio);
    const destination = audioCtx.createMediaStreamDestination();
    sourceNode.connect(destination);
    sourceNode.connect(audioCtx.destination);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0, img.width, img.height);

    const videoStream = canvas.captureStream(30);
    const audioTrack = destination.stream.getAudioTracks()[0];
    videoStream.addTrack(audioTrack);

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(videoStream, {
      mimeType: "video/webm; codecs=vp8, opus",
    });
    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const videoBlob = new Blob(chunks, { type: "video/webm" });
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoObjectUrl);
    };

    recorder.start();
    await audioCtx.resume();
    audio.play();
    audio.onended = () => recorder.stop();

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center m-8">
      <h1 className="text-4xl mb-4">Generate Brainrot Media</h1>
      <div className="flex space-x-8">
        <div className="w-80 border bg-gray-100 flex flex-col items-center p-4 space-y-2">
          {videoUrl ? (
            <img
              src={videoUrl}
              alt="Generated"
              className="w-full h-auto rounded"
            />
          ) : (
            <p>{loading ? "Generating image..." : "No image generated yet."}</p>
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