import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

    try {
      const audioScript = await returnScript(`Generate a script for a tiktok video about the following user input: ${script}. If the user input is empty, generate something by yourself. It will be directly used to generate a video so give the script only, no formulations like "Here is the script" or "There is no user input". It needs to be 30 seconds long max so avoid doing more than 100 words.`);
      const audioURL = await returnAudioURL(audioScript);
      const audio = new Audio(audioURL);

      const audioCtx = new AudioContext();
      const sourceNode = audioCtx.createMediaElementSource(audio);
      const destination = audioCtx.createMediaStreamDestination();
      sourceNode.connect(destination);

      const backgroundVideo = document.createElement("video");
      backgroundVideo.src = "/subwaysurferclip.mp4";
      backgroundVideo.loop = true;
      backgroundVideo.preload = "auto";

      await new Promise((resolve) => {
        backgroundVideo.onloadeddata = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 360;
      canvas.height = 640;
      const ctx = canvas.getContext("2d");

      const canvasStream = canvas.captureStream(24);

      const audioTrack = destination.stream.getAudioTracks()[0];
      canvasStream.addTrack(audioTrack);

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(canvasStream, {
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
      backgroundVideo.play();

      const drawFrame = () => {
        if (!backgroundVideo.paused && !backgroundVideo.ended) {
          ctx?.drawImage(backgroundVideo, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        }
      };
      drawFrame();

      audio.onended = () => {
        recorder.stop();
        backgroundVideo.pause();
      };
    } catch (error) {
      console.error("Error generating video:", error);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="text-6xl m-[10px]">Generate Subway Surfer Brainrot</h1>
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
            placeholder="Type in your script here or type in your idea and generate the script with the button below. Leave it empty to generate a random script. Then hit Generate Video"
          />
          <Button onClick={generateVideo} disabled={loading} className="w-[620px] h-[40px]">
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </div>
      </div>
    </main>
  );
}