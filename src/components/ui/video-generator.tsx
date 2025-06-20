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

async function returnScript(prompt: string): Promise<string> {
  const res = await fetch("/api/generate-script", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: prompt }),
  });
  if (!res.ok) throw new Error(await res.text());
  const { script } = await res.json();
  return script;
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

    const audioScript = await returnScript(`Generate a 3D goofy image of: " + script + ". The image should be colorful, surreal, and have a brainrot aesthetic. It should not contain any text or logos. The image should be suitable for use as a background for a video. Portrait mode.`);
    const audioURL = await returnAudioURL(audioScript);
    const audio = new Audio(audioURL);

    const audioCtx = new AudioContext();
    const sourceNode = audioCtx.createMediaElementSource(audio);
    const destination = audioCtx.createMediaStreamDestination();
    sourceNode.connect(destination);
    sourceNode.connect(audioCtx.destination);

    const canvas = document.createElement("canvas");
    canvas.width = 360;
    canvas.height = 640;
    const ctx = canvas.getContext("2d")!;

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.width
    const ih = img.height

    const scale = Math.max(cw / iw, ch / ih)
    const sw = cw / scale
    const sh = ch / scale
    const sx = (iw - sw) / 2
    const sy = (ih - sh) / 2
    ctx.drawImage(
      img,
      sx, sy, sw, sh,
      0,  0,  cw, ch
    )

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
      <div className="flex justify-between w-[1000px]">
        <div className="w-[360px] h-[640px] border bg-gray-100 flex flex-col items-center rounded space-y-2">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-[360px] h-[640px] rounded"
            />
          ) : (
            <p>{loading ? "Generating media…" : "No media generated yet."}</p>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <Textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-[620px] h-[580px]"
          />
          <Button onClick={generateVideo} disabled={loading} className="w-[620px] h-[40px]">
            {loading ? "Generating..." : "Generate Media"}
          </Button>
        </div>
      </div>
    </main>
  );
}