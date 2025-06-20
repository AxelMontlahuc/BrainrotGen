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

async function returnAudioURL(script: string): Promise<string> {
  const audioRes = await fetch("/api/generate-audio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ script }),
  });
  if (!audioRes.ok) {
    const err = await audioRes.text();
    console.error("generate-audio failed:", err);
    throw new Error(err || "generate-audio error");
  }

  const audioData = await audioRes.json();
  const b64 = audioData.result?.audio ?? audioData.audio;
  if (typeof b64 !== "string") {
    console.error("unexpected audio payload:", audioData);
    throw new Error("No audio returned from API");
  }

  return `data:audio/mpeg;base64,${b64}`;
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

    const bgMusic = new Audio("/bgmusic.mp3")
    bgMusic.loop = true
    await new Promise((r) => (bgMusic.onloadedmetadata = r))

    const audioCtx = new AudioContext();
    const sourceNode = audioCtx.createMediaElementSource(audio);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 1.0;
    sourceNode.connect(gainNode);

    const bgSource = audioCtx.createMediaElementSource(bgMusic);
    const bgGain = audioCtx.createGain();
    bgGain.gain.value = 0.3;
    bgSource.connect(bgGain);

    const destination = audioCtx.createMediaStreamDestination();
    gainNode.connect(destination);
    bgGain.connect(destination);

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
      setLoading(false);
    };

    recorder.start();
    await audioCtx.resume();
    audio.play();
    bgMusic.play();
    audio.onended = () => {
      recorder.stop();
      bgMusic.pause();
    }

  };

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="text-6xl m-[10px]">Generate Italian Brainrot</h1>
      </div>
      <div className="flex justify-between w-[1000px] m-[40px] mb-[80px]">
        <div className="w-[360px] h-[640px] border dark:bg-input/30 flex flex-col justify-center items-center rounded-md space-y-2">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-[360px] h-[640px] rounded-md"
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
            placeholder="Type in what you want to generate in english, e.g. 'A shark wearing sneakers on the beach' for Tralalero Tralala"
          />
          <Button onClick={generateVideo} disabled={loading} className="w-[620px] h-[40px]">
            {loading ? "Generating..." : "Generate Media"}
          </Button>
        </div>
      </div>
    </main>
  );
}